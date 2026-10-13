import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên.").max(255),
  email: z
    .string()
    .trim()
    .email("Địa chỉ email chưa hợp lệ.")
    .max(255),
  phone: z.string().trim().max(50).optional().default(""),
  company: z.string().trim().max(255).optional().default(""),
  industry: z.string().trim().max(100).optional().default(""),
  standard: z.string().trim().max(100).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Nội dung cần ít nhất 10 ký tự.")
    .max(5000, "Nội dung không được vượt quá 5.000 ký tự."),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Dữ liệu gửi lên không phải JSON hợp lệ." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Vui lòng kiểm tra lại thông tin đã nhập.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const inquiry = await prisma.contactInquiry.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        industry: parsed.data.industry || null,
        requestedStandard: parsed.data.standard || null,
        subject: parsed.data.standard || "Yêu cầu tư vấn từ website",
        message: parsed.data.message,
      },
      select: { id: true },
    });

    return NextResponse.json(
      { ok: true, data: inquiry },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save contact inquiry.", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Hệ thống chưa thể lưu yêu cầu lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp với ISATS.",
      },
      { status: 503 },
    );
  }
}
