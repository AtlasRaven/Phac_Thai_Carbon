import Link from "next/link";
import { ArrowRight, Factory, FileCheck2, GraduationCap, Leaf, SearchCheck } from "lucide-react";
import { PageHeading, SectionTitle } from "@/components/page-heading";

export const metadata = {
  title: "Dịch vụ | Thẩm định và thẩm tra khí nhà kính ISATS",
  description: "Dịch vụ thẩm tra kiểm kê GHG, đánh giá dự án tín chỉ carbon và đào tạo.",
};

const services = [
  {
    icon: Factory,
    number: "01",
    title: "Thẩm tra kiểm kê khí nhà kính cấp doanh nghiệp",
    standard: "ISO 14064-1",
    text: "Đánh giá ranh giới, nguồn phát thải, phương pháp định lượng, dữ liệu hoạt động và báo cáo kiểm kê của tổ chức.",
    href: "/dich-vu/iso-14064-1",
  },
  {
    icon: Leaf,
    number: "02",
    title: "Thẩm định & thẩm tra dự án tín chỉ carbon",
    standard: "ISO 14064-2 · Verra · Gold Standard",
    text: "Rà soát thiết kế dự án, đường cơ sở, tính bổ sung, phương pháp luận và kết quả giám sát theo chương trình áp dụng.",
    href: "/dich-vu/iso-14064-2",
  },
  {
    icon: GraduationCap,
    number: "03",
    title: "Đào tạo và nâng cao năng lực GHG",
    standard: "Theo phạm vi và nhu cầu",
    text: "Chương trình đào tạo về nguyên tắc kiểm kê, dữ liệu phát thải và cách chuẩn bị hồ sơ đánh giá.",
    href: "/lien-he",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHeading
        eyebrow="DỊCH VỤ"
        title="Chuyên môn khí hậu cho doanh nghiệp và dự án."
        description="Lựa chọn dịch vụ phù hợp với loại thông tin cần đánh giá, tiêu chuẩn áp dụng và mục tiêu của tổ chức."
      />
      <section className="bg-surface py-16 sm:py-20">
        <div className="site-container">
          <SectionTitle eyebrow="DANH MỤC DỊCH VỤ" title="Từ báo cáo phát thải đến dự án carbon." />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <article className="service-card group" key={service.number}>
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white">
                  <service.icon size={25} />
                </span>
                <p className="mt-7 text-xs font-semibold tracking-[0.13em] text-brand">{service.standard}</p>
                <h2 className="mt-3 text-xl font-semibold text-ink">{service.title}</h2>
                <p className="mt-3 min-h-[100px] text-sm leading-7 text-ink-muted">{service.text}</p>
                <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Xem chi tiết <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="site-container grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="eyebrow">PHẠM VI PHÙ HỢP</p>
            <h2 className="mt-4 text-3xl font-semibold text-ink">Mỗi hoạt động bắt đầu bằng xác định phạm vi.</h2>
          </div>
          <div className="flex gap-4 rounded-2xl border border-line bg-surface p-6">
            <SearchCheck className="shrink-0 text-brand" size={25} />
            <p className="text-sm leading-7 text-ink-muted">
              Tiêu chuẩn, mức đảm bảo, ranh giới, kỳ báo cáo, tiêu chí và năng
              lực cần thiết được thống nhất trước khi thực hiện. Việc tiếp
              nhận yêu cầu không mặc nhiên đồng nghĩa với khả năng cung cấp
              dịch vụ cho mọi chương trình hoặc phạm vi công nhận.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-brand-darker py-14 text-white">
        <div className="site-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Bạn chưa chắc dịch vụ nào phù hợp?</h2>
            <p className="mt-2 text-sm text-white/65">Trao đổi nhu cầu cùng đội ngũ ISATS.</p>
          </div>
          <Link href="/lien-he" className="button-primary shrink-0">Gửi yêu cầu <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
