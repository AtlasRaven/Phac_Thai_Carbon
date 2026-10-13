import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Leaf, Scale, ShieldCheck } from "lucide-react";
import { PageHeading } from "@/components/page-heading";

export const metadata = {
  title: "Thẩm định & thẩm tra dự án carbon | ISO 14064-2 | ISATS",
  description: "Đánh giá độc lập thiết kế và kết quả dự án giảm phát thải theo tiêu chuẩn, chương trình carbon áp dụng.",
};

const reviewItems = [
  { icon: Scale, title: "Đường cơ sở & tính bổ sung", text: "Xem xét kịch bản tham chiếu, giả định và lập luận về tính bổ sung theo phương pháp luận." },
  { icon: ClipboardCheck, title: "Kế hoạch giám sát", text: "Đánh giá kế hoạch theo dõi dữ liệu, trách nhiệm, tần suất và kiểm soát chất lượng." },
  { icon: ShieldCheck, title: "Định lượng & bằng chứng", text: "Rà soát dữ liệu, cách tính mức giảm phát thải hoặc tăng cường loại bỏ và hồ sơ hỗ trợ." },
];

export default function Iso140642Page() {
  return (
    <main>
      <PageHeading
        eyebrow="THẨM ĐỊNH & THẨM TRA · ISO 14064-2"
        title="Bảo đảm độc lập cho dự án giảm phát thải."
        description="Đánh giá thiết kế dự án và kết quả phát thải khí nhà kính theo ISO 14064-2 hoặc chương trình áp dụng như Verra VCS, Gold Standard khi phù hợp phạm vi."
      >
        <Link href="/lien-he" className="button-primary mt-7">Trao đổi về dự án <ArrowRight size={16} /></Link>
      </PageHeading>
      <section className="bg-white py-16 sm:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">ĐÁNH GIÁ THEO GIAI ĐOẠN</p>
            <h2 className="mt-4 text-3xl font-semibold text-ink">Thiết kế dự án và kết quả giám sát.</h2>
            <p className="mt-4 text-base leading-8 text-ink-muted">
              Thẩm định tập trung vào tính hợp lý của thiết kế dự án và tài liệu
              nền tảng. Thẩm tra xem xét thông tin phát thải hoặc giảm phát
              thải đã được giám sát trong kỳ báo cáo. Mỗi hoạt động sử dụng
              tiêu chí và phiên bản chương trình được xác định rõ.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-line bg-surface p-6">
              <Leaf className="text-brand" size={23} />
              <h3 className="mt-4 font-semibold text-ink">Thẩm định thiết kế</h3>
              <p className="mt-2 text-sm leading-6 text-ink-subtle">Đường cơ sở, phương pháp luận, tính bổ sung, rủi ro và kế hoạch giám sát.</p>
            </article>
            <article className="rounded-2xl border border-line bg-surface p-6">
              <ClipboardCheck className="text-brand" size={23} />
              <h3 className="mt-4 font-semibold text-ink">Thẩm tra kết quả</h3>
              <p className="mt-2 text-sm leading-6 text-ink-subtle">Dữ liệu kỳ báo cáo, phương pháp tính và hồ sơ chứng minh hoạt động thực tế.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-surface py-16 sm:py-20">
        <div className="site-container">
          <p className="eyebrow">CÁC KHÍA CẠNH ĐƯỢC QUAN TÂM</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink">Tính toàn vẹn môi trường và truy xuất kết quả.</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {reviewItems.map((item) => (
              <article key={item.title} className="service-card">
                <item.icon size={24} className="text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 flex gap-3 rounded-xl bg-white p-5 text-sm leading-6 text-ink-subtle">
            <Check size={18} className="mt-0.5 shrink-0 text-brand" />
            Khả năng thực hiện phụ thuộc chương trình, phương pháp luận, phiên
            bản, phạm vi công nhận và năng lực được phân công; vui lòng xác
            nhận trước khi đăng ký.
          </p>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="site-container flex flex-col justify-between gap-6 rounded-3xl bg-brand-darker p-7 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-xl font-semibold">Đang chuẩn bị dự án carbon?</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">Gửi thông tin chương trình và giai đoạn đánh giá dự kiến cho ISATS.</p>
          </div>
          <Link className="button-primary shrink-0" href="/lien-he">Liên hệ chuyên gia <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
