import Link from "next/link";
import { ArrowRight, Check, Factory, Flame, Lightbulb, Truck } from "lucide-react";
import { PageHeading } from "@/components/page-heading";

export const metadata = {
  title: "Thẩm tra kiểm kê GHG ISO 14064-1 | ISATS",
  description: "Thẩm tra báo cáo kiểm kê khí nhà kính cấp tổ chức theo ISO 14064-1.",
};

const scopes = [
  { title: "Phạm vi 1 · Phát thải trực tiếp", icon: Flame, text: "Phát thải từ nguồn do tổ chức sở hữu hoặc kiểm soát, như đốt nhiên liệu tại chỗ, phương tiện thuộc doanh nghiệp và rò rỉ môi chất." },
  { title: "Phạm vi 2 · Năng lượng mua vào", icon: Lightbulb, text: "Phát thải gián tiếp gắn với điện, hơi nước, nhiệt hoặc làm mát được mua và tiêu thụ trong ranh giới báo cáo." },
  { title: "Phạm vi 3 · Chuỗi giá trị", icon: Truck, text: "Các nguồn phát thải gián tiếp khác trong chuỗi giá trị, được xem xét theo tính liên quan, dữ liệu sẵn có và tiêu chí áp dụng." },
];

export default function Iso140641Page() {
  return (
    <main>
      <PageHeading
        eyebrow="THẨM TRA · ISO 14064-1"
        title="Thẩm tra báo cáo kiểm kê khí nhà kính cấp doanh nghiệp."
        description="Đánh giá độc lập ranh giới, nguồn phát thải, dữ liệu định lượng và báo cáo kiểm kê ở cấp tổ chức theo tiêu chuẩn đã thống nhất."
      >
        <Link href="/lien-he" className="button-primary mt-7">Trao đổi về phạm vi <ArrowRight size={16} /></Link>
      </PageHeading>
      <section className="bg-white py-16 sm:py-20">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">BA PHẠM VI PHÁT THẢI</p>
            <h2 className="mt-4 text-3xl font-semibold text-ink">Nhìn nhận phát thải theo ranh giới tổ chức.</h2>
            <p className="mt-4 text-base leading-8 text-ink-muted">
              ISO 14064-1 đặt ra nguyên tắc và yêu cầu để định lượng, báo cáo
              phát thải và loại bỏ khí nhà kính ở cấp tổ chức. Các phạm vi dưới
              đây là cách phân nhóm thông dụng; nội dung áp dụng phụ thuộc tiêu
              chí, ranh giới báo cáo và yêu cầu cụ thể.
            </p>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {scopes.map((scope) => (
              <article key={scope.title} className="service-card">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand"><scope.icon size={22} /></span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{scope.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{scope.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-16 sm:py-20">
        <div className="site-container grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">CÁC NỘI DUNG CÓ THỂ ĐƯỢC RÀ SOÁT</p>
            <h2 className="mt-4 text-2xl font-semibold text-ink">Bằng chứng, phương pháp và tính nhất quán.</h2>
          </div>
          <ul className="space-y-4">
            {[
              "Ranh giới tổ chức và ranh giới báo cáo",
              "Nhận diện nguồn, bể chứa và khí nhà kính liên quan",
              "Dữ liệu hoạt động, hệ số phát thải và phương pháp định lượng",
              "Tính nhất quán, độ không chắc chắn và lưu vết dữ liệu",
              "Báo cáo kiểm kê, giả định và giới hạn thông tin",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-ink-muted">
                <Check className="mt-0.5 shrink-0 text-brand" size={17} />{item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="site-container rounded-3xl bg-brand-darker p-7 text-white sm:p-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <Factory size={25} className="mt-1 shrink-0 text-emerald-300" />
              <div>
                <h2 className="text-xl font-semibold">Tìm hiểu phạm vi thẩm tra phù hợp với doanh nghiệp.</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">Mức đảm bảo, tiêu chí và thời gian được xác định sau khi tiếp nhận hồ sơ.</p>
              </div>
            </div>
            <Link href="/lien-he" className="button-primary shrink-0">Liên hệ ISATS <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
