import Image from "next/image";
import Link from "next/link";
import { StandardType } from "@prisma/client";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Factory,
  FileCheck2,
  GraduationCap,
  Leaf,
  Search,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { PageHeading, SectionTitle } from "@/components/page-heading";
import { getPublishedArticles } from "@/lib/articles";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const standardsCount = Object.keys(StandardType).length;

const services = [
  {
    icon: Factory,
    title: "Thẩm tra kiểm kê khí nhà kính",
    description:
      "Đánh giá độc lập báo cáo phát thải cấp tổ chức theo ISO 14064-1, xem xét nguồn phát thải và dữ liệu Phạm vi 1, 2, 3.",
    href: "/dich-vu/iso-14064-1",
    standard: "ISO 14064-1",
  },
  {
    icon: Leaf,
    title: "Thẩm định dự án tín chỉ carbon",
    description:
      "Rà soát thiết kế, đường cơ sở và phương pháp luận của dự án giảm phát thải theo tiêu chuẩn áp dụng.",
    href: "/dich-vu/iso-14064-2",
    standard: "ISO 14064-2 · VCS",
  },
  {
    icon: GraduationCap,
    title: "Đào tạo khí nhà kính",
    description:
      "Trang bị kiến thức thực hành về kiểm kê, dữ liệu phát thải và chuẩn bị cho hoạt động đánh giá.",
    href: "/lien-he",
    standard: "Chương trình theo nhu cầu",
  },
];

const shortSteps = [
  "Tiếp nhận & đánh giá sơ bộ",
  "Rà soát tài liệu",
  "Khảo sát thực địa",
  "Xử lý sai biệt",
  "Phát hành tuyên bố",
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value);
}

export default async function Home() {
  const [articles, completedProjects, verifiedEmissions] = await Promise.all([
      getPublishedArticles(3),
      prisma.verificationProcess.count({
        where: {
          statementNumber: { not: null },
          verifiedEmissionsTco2e: { not: null },
        },
      }),
      prisma.verificationProcess.aggregate({
        where: {
          statementNumber: { not: null },
          verifiedEmissionsTco2e: { not: null },
        },
        _sum: { verifiedEmissionsTco2e: true },
      }),
    ]);
  const verifiedTotal = Number(verifiedEmissions._sum.verifiedEmissionsTco2e ?? 0);

  return (
    <main>
      <section className="hero-section relative overflow-hidden bg-brand-darker text-white">
        <div className="hero-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="hero-glow absolute inset-0" aria-hidden="true" />
        <div className="site-container relative grid min-h-[640px] items-center gap-12 py-16 lg:grid-cols-[1.03fr_0.97fr] lg:py-20">
          <div className="relative z-10 max-w-[650px] animate-fade-up">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-[11px] font-semibold tracking-[0.13em] text-emerald-100">
              <span className="size-2 rounded-full bg-accent" />
              TỔ CHỨC THẨM ĐỊNH & THẨM TRA ĐỘC LẬP
            </div>
            <h1 className="max-w-[700px] text-balance-tight text-[clamp(2.8rem,6vw,5.1rem)] font-semibold leading-[1.05] text-white">
              Dữ liệu khí hậu
              <br />
              <span className="font-medium text-emerald-300">
                vững tin tăng trưởng.
              </span>
            </h1>
            <p className="mt-7 max-w-[550px] text-base leading-8 text-emerald-50/75 sm:text-lg">
              Thẩm tra kiểm kê khí nhà kính, thẩm định dự án carbon và đào tạo
              chuyên môn — đồng hành cùng doanh nghiệp trên hành trình phát
              thải thấp.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href="/lien-he">
                Trao đổi cùng chuyên gia <ArrowRight size={17} />
              </Link>
              <Link className="button-ghost" href="/dich-vu">
                Khám phá dịch vụ <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={17} className="text-emerald-300" />
                Theo tiêu chuẩn quốc tế
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={17} className="text-emerald-300" />
                Đánh giá dựa trên bằng chứng
              </span>
            </div>
          </div>
          <div className="hero-visual relative mx-auto w-full max-w-[550px]">
            <div className="hero-photo relative aspect-[1.08] overflow-hidden rounded-[28px] border border-white/15 shadow-2xl shadow-black/30">
              <Image
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=90"
                alt="Cánh đồng điện gió giữa đồi xanh"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071d16]/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-7 sm:p-9">
                <p className="text-xs font-semibold tracking-[0.16em] text-emerald-200">
                  ĐỘC LẬP · MINH BẠCH · TIN CẬY
                </p>
                <p className="mt-3 max-w-sm text-2xl font-medium leading-snug text-white sm:text-3xl">
                  Bảo đảm khí hậu bắt đầu từ dữ liệu đáng tin cậy.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-ink shadow-raised sm:-left-8">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Wind size={22} />
              </span>
              <span>
                <span className="block text-sm font-semibold">Chuyển đổi xanh</span>
                <span className="mt-0.5 block text-xs text-ink-subtle">
                  Dữ liệu làm nền tảng
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="site-container">
          <div className="mb-7 text-center">
            <p className="eyebrow">NĂNG LỰC ĐƯỢC XÂY DỰNG TRÊN TIÊU CHUẨN</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: `${formatNumber(verifiedTotal)} tCO₂e`,
                label: "Khối lượng đã xác minh trong dữ liệu hệ thống",
              },
              {
                value: formatNumber(completedProjects),
                label: "Tuyên bố thẩm tra đã ghi nhận",
              },
              {
                value: formatNumber(standardsCount),
                label: "Tiêu chuẩn & chương trình trong danh mục",
              },
              {
                value: "17029 · 14065",
                label: "Khung tiêu chuẩn cho hoạt động thẩm định",
              },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="text-2xl font-semibold tracking-tight text-brand sm:text-[1.7rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-ink-subtle">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-ink-faint">
            Số liệu được tổng hợp từ các tuyên bố đã ghi nhận trong hệ thống.
            Việc áp dụng tiêu chuẩn phụ thuộc phạm vi dịch vụ được thống nhất.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="site-container">
          <SectionTitle
            eyebrow="DỊCH VỤ CỐT LÕI"
            title="Đánh giá độc lập cho từng mục tiêu khí hậu."
            description="Từ kiểm kê phát thải cấp doanh nghiệp đến dự án giảm phát thải và nâng cao năng lực nội bộ."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.title} className="service-card group">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <service.icon size={25} strokeWidth={1.7} />
                </span>
                <p className="mt-7 text-xs font-semibold tracking-[0.14em] text-ink-faint">
                  0{index + 1} · {service.standard}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 min-h-[90px] text-sm leading-7 text-ink-muted">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand"
                >
                  Tìm hiểu dịch vụ <ChevronRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-darker py-20 text-white sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="eyebrow eyebrow-light">QUY TRÌNH THẨM ĐỊNH</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-[2.6rem]">
              Minh bạch qua từng bước.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/65">
              Phạm vi công việc và cách đánh giá được thống nhất trước khi bắt
              đầu, giúp doanh nghiệp chủ động trong suốt quá trình.
            </p>
            <Link className="button-primary mt-7" href="/quy-trinh-tham-dinh">
              Xem quy trình chi tiết <ArrowRight size={16} />
            </Link>
          </div>
          <ol className="process-strip">
            {shortSteps.map((step, index) => (
              <li key={step}>
                <span className="process-step-number">0{index + 1}</span>
                <span className="mt-3 block text-sm font-medium leading-6 text-white">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="site-container">
          <div className="lookup-widget">
            <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-emerald-200">
              <Search size={25} />
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.14em] text-emerald-200">
                TRA CỨU CÔNG KHAI
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                Xác minh tuyên bố thẩm tra của bạn.
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Tra cứu trạng thái tuyên bố theo mã chứng nhận hoặc mã dự án.
              </p>
            </div>
            <Link className="button-primary shrink-0" href="/tra-cuu-chung-nhan">
              Tra cứu ngay <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow="GÓC NHÌN CHUYÊN MÔN"
              title="Cập nhật tri thức khí hậu."
            />
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
            >
              Tất cả bài viết <ArrowRight size={16} />
            </Link>
          </div>
          {articles.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <article key={article.id} className="insight-card group">
                  <Link href={`/tin-tuc/${article.slug}`} className="block">
                    <div className="relative aspect-[1.55] overflow-hidden rounded-2xl bg-brand-soft">
                      {article.thumbnailUrl && (
                        <Image
                          src={article.thumbnailUrl}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 90vw, 30vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                    <p className="mt-5 text-[10px] font-bold tracking-[0.15em] text-brand">
                      {article.category ?? "GÓC NHÌN"}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink group-hover:text-brand">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-subtle">
                        {article.summary}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-line bg-white p-8 text-ink-subtle">
              Bài viết chuyên môn sẽ được cập nhật tại đây.
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="site-container flex flex-col items-center justify-between gap-6 rounded-3xl bg-brand-tint p-7 sm:flex-row sm:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand">
              <Check size={20} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">
                Sẵn sàng trao đổi về nhu cầu đánh giá?
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink-subtle">
                ISATS sẽ cùng bạn xác định phạm vi và tiêu chuẩn phù hợp.
              </p>
            </div>
          </div>
          <Link href="/lien-he" className="button-primary shrink-0">
            Liên hệ ISATS <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
