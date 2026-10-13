import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleAlert, ClipboardList, FileText, FolderOpen, LockKeyhole, Upload } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { getCurrentClient } from "@/lib/session";
import { prisma } from "@/lib/db";
import { ProjectUploadForm } from "@/components/project-upload-form";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Cổng doanh nghiệp | ISATS",
  description: "Theo dõi hồ sơ đánh giá khí nhà kính, tài liệu đã gửi và yêu cầu khắc phục.",
};

const statusLabels: Record<string, string> = {
  submitted: "Đã tiếp nhận",
  under_review: "Đang rà soát",
  verification: "Đang thẩm tra",
  approved: "Đã phê duyệt",
  rejected: "Cần cập nhật",
  on_hold: "Tạm hoãn",
};

export default async function DashboardPage() {
  const client = await getCurrentClient();
  if (!client) {
    return (
      <main>
        <PageHeading eyebrow="CỔNG DOANH NGHIỆP" title="Không gian theo dõi hồ sơ đánh giá." description="Đăng nhập bằng tài khoản khách hàng ISATS để xem dự án, gửi tài liệu và theo dõi phản hồi." />
        <section className="bg-surface py-16">
          <div className="site-container max-w-2xl rounded-3xl border border-line bg-white p-8 text-center shadow-card sm:p-12">
            <LockKeyhole className="mx-auto text-brand" size={34} />
            <h2 className="mt-5 text-2xl font-semibold text-ink">Cần tài khoản khách hàng</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-ink-subtle">Cổng dự án chỉ dành cho khách hàng đã được cấp quyền. Liên hệ ISATS để được hỗ trợ truy cập hoặc trao đổi về hồ sơ.</p>
            <Link href="/lien-he" className="button-primary mt-6">Liên hệ ISATS <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
    );
  }

  const projects = await prisma.ghgProject.findMany({
    where: { clientId: client.id },
    orderBy: { createdAt: "desc" },
    include: {
      documents: { orderBy: { uploadedAt: "desc" }, take: 3, select: { id: true, fileName: true, uploadedAt: true } },
      correctiveActions: { orderBy: { createdAt: "desc" }, select: { id: true, code: true, title: true, description: true, status: true, dueDate: true } },
      verifications: { orderBy: { createdAt: "desc" }, take: 1, select: { currentStage: true, statementNumber: true } },
    },
  });
  const activeCars = projects.reduce((sum, project) => sum + project.correctiveActions.filter((action) => action.status.toLowerCase() !== "closed" && action.status.toLowerCase() !== "resolved").length, 0);

  return (
    <main>
      <PageHeading eyebrow="CỔNG DOANH NGHIỆP" title={`Xin chào, ${client.fullName}.`} description={`Theo dõi hồ sơ${client.organizationName ? ` của ${client.organizationName}` : " doanh nghiệp"}, tài liệu đã gửi và các phản hồi từ nhóm đánh giá ISATS.`} />
      <section className="bg-surface py-12 sm:py-16">
        <div className="site-container">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Hồ sơ dự án", value: projects.length, icon: FolderOpen },
              { label: "Yêu cầu khắc phục đang mở", value: activeCars, icon: CircleAlert },
              { label: "Tuyên bố đã phát hành", value: projects.filter((p) => p.verifications.some((v) => v.statementNumber)).length, icon: BadgeCheck },
            ].map((stat) => <article key={stat.label} className="rounded-2xl border border-line bg-white p-5 shadow-card"><stat.icon size={21} className="text-brand" /><p className="mt-4 text-3xl font-semibold text-ink">{stat.value}</p><p className="mt-1 text-sm text-ink-subtle">{stat.label}</p></article>)}
          </div>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.45fr_0.75fr]">
            <section>
              <div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow">HỒ SƠ CỦA BẠN</p><h2 className="mt-2 text-2xl font-semibold text-ink">Dự án GHG</h2></div><span className="text-sm text-ink-subtle">{projects.length} dự án</span></div>
              {projects.length ? <div className="space-y-5">{projects.map((project) => <article key={project.id} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
                  <div><p className="text-xs font-semibold tracking-wide text-brand">{project.projectCode} · {project.standard.replaceAll("_", " ")}</p><h3 className="mt-2 text-lg font-semibold text-ink">{project.projectName}</h3><p className="mt-1 text-sm text-ink-subtle">{project.sector} · {project.type === "ghg_inventory" ? "Kiểm kê GHG" : "Dự án tín chỉ carbon"}</p></div>
                  <span className="rounded-full bg-brand-tint px-3 py-1.5 text-xs font-semibold text-brand">{statusLabels[project.status] ?? project.status}</span>
                </div>
                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                  <div><h4 className="flex items-center gap-2 text-sm font-semibold text-ink"><FileText size={16} className="text-brand" /> Tài liệu gần đây</h4>{project.documents.length ? <ul className="mt-3 space-y-2">{project.documents.map((doc) => <li key={doc.id} className="flex justify-between gap-3 text-xs text-ink-subtle"><span className="truncate">{doc.fileName}</span><time className="shrink-0">{new Intl.DateTimeFormat("vi-VN").format(doc.uploadedAt)}</time></li>)}</ul> : <p className="mt-3 text-xs text-ink-faint">Chưa có tài liệu được tải lên.</p>}</div>
                  <div><h4 className="flex items-center gap-2 text-sm font-semibold text-ink"><ClipboardList size={16} className="text-brand" /> Phản hồi & CARs</h4>{project.correctiveActions.length ? <ul className="mt-3 space-y-3">{project.correctiveActions.map((action) => <li key={action.id} className="rounded-xl bg-surface p-3"><div className="flex justify-between gap-2"><span className="text-xs font-semibold text-ink">{action.code} · {action.title}</span><span className="shrink-0 text-[10px] font-semibold uppercase text-amber-700">{action.status}</span></div><p className="mt-1 text-xs leading-5 text-ink-subtle">{action.description}</p>{action.dueDate && <p className="mt-2 text-[10px] text-ink-faint">Hạn phản hồi: {new Intl.DateTimeFormat("vi-VN").format(action.dueDate)}</p>}</li>)}</ul> : <p className="mt-3 text-xs text-ink-faint">Chưa có yêu cầu khắc phục.</p>}</div>
                </div>
              </article>)}</div> : <div className="rounded-2xl border border-line bg-white p-8 text-center"><FolderOpen className="mx-auto text-brand" size={28} /><h3 className="mt-4 font-semibold text-ink">Chưa có dự án được liên kết</h3><p className="mt-2 text-sm text-ink-subtle">ISATS sẽ hiển thị hồ sơ tại đây sau khi liên kết với tài khoản doanh nghiệp.</p></div>}
            </section>

            <aside className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand"><Upload size={19} /></span><div><p className="eyebrow">GỬI HỒ SƠ</p><h2 className="mt-1 text-lg font-semibold text-ink">Tải tài liệu lên</h2></div></div><p className="mt-3 text-sm leading-6 text-ink-subtle">Chọn dự án và gửi báo cáo hoặc bằng chứng cho nhóm đánh giá.</p>{projects.length ? <ProjectUploadForm projects={projects.map(({ id, projectName, projectCode }) => ({ id, projectName, projectCode }))} /> : <p className="mt-4 rounded-xl bg-surface p-3 text-xs leading-5 text-ink-subtle">Bạn cần có dự án được liên kết trước khi gửi tài liệu.</p>}<p className="mt-4 text-[11px] leading-5 text-ink-faint">Hỗ trợ PDF, Word, Excel và CSV · Tối đa 10 MB mỗi tệp.</p></aside>
          </div>
        </div>
      </section>
    </main>
  );
}
