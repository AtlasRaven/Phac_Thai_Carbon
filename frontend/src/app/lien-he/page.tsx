import Link from "next/link";
import { ArrowRight, Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHeading } from "@/components/page-heading";

export const metadata = {
  title: "Liên hệ ISATS | Yêu cầu tư vấn đánh giá",
  description: "Gửi yêu cầu tư vấn kiểm kê khí nhà kính, thẩm tra và dự án tín chỉ carbon.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeading
        eyebrow="LIÊN HỆ & ĐĂNG KÝ"
        title="Cùng xác định bước tiếp theo."
        description="Chia sẻ nhu cầu đánh giá, lĩnh vực hoạt động và tiêu chuẩn quan tâm. ISATS sẽ liên hệ để trao đổi phạm vi phù hợp."
      />
      <section className="bg-surface py-14 sm:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <aside>
            <p className="eyebrow">KẾT NỐI VỚI ISATS</p>
            <h2 className="mt-4 text-2xl font-semibold text-ink">Chúng tôi sẵn sàng lắng nghe.</h2>
            <p className="mt-3 text-sm leading-7 text-ink-muted">
              Gửi thông tin qua biểu mẫu. Các đầu mối điện thoại, email và địa
              chỉ văn phòng sẽ được xác nhận trực tiếp để tránh hiển thị thông
              tin chưa được kiểm chứng.
            </p>
            <div className="mt-7 space-y-5">
              <div className="contact-detail">
                <span className="contact-icon"><MessageCircle size={19} /></span>
                <span><span className="block text-xs text-ink-subtle">Kênh tiếp nhận</span><span className="mt-1 block font-semibold text-ink">Biểu mẫu yêu cầu trực tuyến</span></span>
              </div>
              <div className="contact-detail">
                <span className="contact-icon"><Mail size={19} /></span>
                <span><span className="block text-xs text-ink-subtle">Thông tin phản hồi</span><span className="mt-1 block font-semibold text-ink">ISATS sẽ liên hệ theo thông tin bạn cung cấp</span></span>
              </div>
              <div className="contact-detail">
                <span className="contact-icon"><Clock3 size={19} /></span>
                <span><span className="block text-xs text-ink-subtle">Địa điểm & lịch đánh giá</span><span className="mt-1 block font-semibold text-ink">Thống nhất theo phạm vi dịch vụ</span></span>
              </div>
            </div>
            <div className="mt-8 rounded-2xl border border-line bg-white p-5">
              <p className="text-sm leading-6 text-ink-subtle">
                Đang là khách hàng ISATS? Đăng nhập để theo dõi hồ sơ dự án và
                gửi tài liệu cho đánh giá viên.
              </p>
              <Link href="/dashboard" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Cổng doanh nghiệp <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-brand-tint p-5 text-sm leading-6 text-ink-muted">
              <MapPin size={19} className="mt-0.5 shrink-0 text-brand" />
              Địa chỉ văn phòng và bản đồ sẽ được xác nhận cùng đầu mối phụ
              trách khi tiếp nhận yêu cầu.
            </div>
          </aside>
          <div className="rounded-[24px] border border-line bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-xl font-semibold text-ink">Yêu cầu tư vấn / báo giá</h2>
            <p className="mt-2 text-sm leading-6 text-ink-subtle">Thông tin có dấu * là bắt buộc.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
