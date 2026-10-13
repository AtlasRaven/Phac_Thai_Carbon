import { BadgeCheck, FileSearch, Search } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tra cứu chứng nhận | ISATS",
  description: "Tra cứu công khai tuyên bố thẩm tra khí nhà kính đã phát hành.",
};

type LookupResult =
  | { state: "empty" }
  | { state: "not-found" }
  | { state: "error" }
  | {
      state: "found";
      projectName: string;
      organizationName: string;
      projectCode: string;
      certificateNumber: string;
      standard: string;
      verifiedEmissions: string;
      issuedAt: string;
    };

async function lookupCertificate(rawCode: string): Promise<LookupResult> {
  const code = rawCode.trim();
  if (!code) return { state: "empty" };

  try {
    const result = await prisma.verificationProcess.findFirst({
      where: {
        statementNumber: { not: null },
        verifiedEmissionsTco2e: { not: null },
        project: {
          is: {
            status: "approved",
            OR: [{ projectCode: { equals: code, mode: "insensitive" } }],
          },
        },
        OR: [
          { statementNumber: { equals: code, mode: "insensitive" } },
          { project: { is: { projectCode: { equals: code, mode: "insensitive" } } } },
        ],
      },
      select: {
        statementNumber: true,
        verifiedEmissionsTco2e: true,
        createdAt: true,
        project: {
          select: {
            projectCode: true,
            projectName: true,
            standard: true,
            client: { select: { organizationName: true } },
          },
        },
      },
    });

    if (
      !result?.project ||
      !result.statementNumber ||
      result.verifiedEmissionsTco2e === null
    ) {
      return { state: "not-found" };
    }

    return {
      state: "found",
      projectName: result.project.projectName,
      organizationName:
        result.project.client?.organizationName ?? "Không có thông tin công khai",
      projectCode: result.project.projectCode,
      certificateNumber: result.statementNumber,
      standard: result.project.standard.replaceAll("_", " "),
      verifiedEmissions: new Intl.NumberFormat("vi-VN", {
        maximumFractionDigits: 2,
      }).format(Number(result.verifiedEmissionsTco2e)),
      issuedAt: new Intl.DateTimeFormat("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(result.createdAt),
    };
  } catch (error) {
    console.error("Certificate lookup failed.", error);
    return { state: "error" };
  }
}

export default async function CertificateLookupPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code = "" } = await searchParams;
  const result = await lookupCertificate(code.slice(0, 100));

  return (
    <main>
      <PageHeading
        eyebrow="TRA CỨU CÔNG KHAI"
        title="Kiểm tra tuyên bố thẩm tra."
        description="Nhập mã tuyên bố thẩm tra hoặc mã dự án để xem thông tin công khai đã được ISATS ghi nhận."
      />
      <section className="bg-surface py-14 sm:py-20">
        <div className="site-container max-w-3xl">
          <form className="lookup-form" action="/tra-cuu-chung-nhan" method="get">
            <label htmlFor="certificate-code" className="form-field">
              Mã tuyên bố hoặc mã dự án
              <input
                id="certificate-code"
                name="code"
                defaultValue={code}
                placeholder="Ví dụ: ISATS-VS-2026-0001"
                maxLength={100}
                required
              />
            </label>
            <button className="button-submit sm:w-auto" type="submit">
              <Search size={17} /> Tra cứu
            </button>
          </form>

          {result.state === "found" && (
            <article className="certificate-result mt-8">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-brand">
                  <BadgeCheck size={24} />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.13em] text-brand">ĐÃ XÁC MINH TRONG HỆ THỐNG</p>
                  <h2 className="mt-2 text-xl font-semibold text-ink">{result.certificateNumber}</h2>
                  <p className="mt-1 text-sm text-ink-subtle">Ngày ghi nhận: {result.issuedAt}</p>
                </div>
              </div>
              <dl className="certificate-details mt-7">
                <div><dt>Tổ chức</dt><dd>{result.organizationName}</dd></div>
                <div><dt>Dự án / báo cáo</dt><dd>{result.projectName}</dd></div>
                <div><dt>Mã dự án</dt><dd>{result.projectCode}</dd></div>
                <div><dt>Tiêu chuẩn</dt><dd>{result.standard}</dd></div>
                <div><dt>Khối lượng đã xác minh</dt><dd>{result.verifiedEmissions} tCO₂e</dd></div>
                <div><dt>Trạng thái</dt><dd><span className="status-badge">Đã phát hành</span></dd></div>
              </dl>
              <p className="mt-6 border-t border-line pt-4 text-xs leading-5 text-ink-faint">
                Kết quả tra cứu chỉ phản ánh thông tin công khai đang lưu trong
                hệ thống. Vui lòng liên hệ ISATS để xác nhận phạm vi, tính hiệu
                lực và bản tuyên bố đầy đủ.
              </p>
            </article>
          )}

          {result.state === "not-found" && (
            <div className="lookup-feedback lookup-feedback-error mt-8" role="status">
              <FileSearch size={21} />
              <p>Không tìm thấy tuyên bố đã phát hành phù hợp với mã tra cứu này. Vui lòng kiểm tra lại mã và thử lại.</p>
            </div>
          )}
          {result.state === "error" && (
            <div className="lookup-feedback lookup-feedback-error mt-8" role="alert">
              <FileSearch size={21} />
              <p>Tra cứu tạm thời chưa khả dụng. Vui lòng thử lại sau.</p>
            </div>
          )}
          {result.state === "empty" && (
            <p className="mt-6 text-sm text-ink-subtle">Ví dụ mã tuyên bố: ISATS-VS-2026-0001.</p>
          )}
        </div>
      </section>
    </main>
  );
}
