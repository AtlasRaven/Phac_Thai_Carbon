import { NextResponse } from "next/server";
import { getCurrentClient } from "@/lib/session";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "application/csv",
]);

export async function POST(request: Request) {
  const client = await getCurrentClient();
  if (!client) return NextResponse.json({ error: "Vui lòng đăng nhập tài khoản khách hàng." }, { status: 401 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Dữ liệu tải lên không hợp lệ." }, { status: 400 });
  }
  const projectId = form.get("projectId");
  const file = form.get("file");
  if (typeof projectId !== "string" || !(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Vui lòng chọn dự án và tệp tài liệu." }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Tệp vượt quá giới hạn 10 MB." }, { status: 413 });
  if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "Định dạng tệp chưa được hỗ trợ." }, { status: 415 });
  if (file.name.length > 255) return NextResponse.json({ error: "Tên tệp quá dài." }, { status: 400 });

  try {
    const project = await prisma.ghgProject.findFirst({ where: { id: projectId, clientId: client.id }, select: { id: true } });
    if (!project) return NextResponse.json({ error: "Không tìm thấy dự án thuộc tài khoản của bạn." }, { status: 404 });
    await prisma.projectDocument.create({
      data: {
        projectId: project.id,
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        fileSize: file.size,
        content: Buffer.from(await file.arrayBuffer()),
      },
      select: { id: true },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Project document upload failed.", error);
    return NextResponse.json({ error: "Không thể lưu tài liệu lúc này. Vui lòng thử lại sau." }, { status: 503 });
  }
}
