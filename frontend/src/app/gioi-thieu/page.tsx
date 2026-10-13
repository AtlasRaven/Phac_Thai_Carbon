import Image from "next/image";
import { BadgeCheck, Eye, Fingerprint, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { PageHeading, SectionTitle } from "@/components/page-heading";

export const metadata = {
  title: "Giới thiệu ISATS | Đánh giá khí hậu độc lập",
  description: "Tìm hiểu tầm nhìn, sứ mệnh và nguyên tắc hoạt động của ISATS.",
};

const values = [
  { icon: ShieldCheck, title: "Độc lập", text: "Đưa ra kết luận khách quan trên cơ sở bằng chứng và phạm vi đã thống nhất." },
  { icon: Fingerprint, title: "Toàn vẹn", text: "Bảo vệ tính nhất quán, bảo mật và khả năng truy xuất trong hoạt động đánh giá." },
  { icon: Eye, title: "Minh bạch", text: "Trao đổi rõ ràng về phương pháp, giới hạn, phát hiện và cơ sở kết luận." },
  { icon: HeartHandshake, title: "Tôn trọng", text: "Làm việc chuyên nghiệp, công bằng và phù hợp với bối cảnh của từng tổ chức." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeading
        eyebrow="VỀ ISATS"
        title="Niềm tin khí hậu bắt đầu từ đánh giá độc lập."
        description="ISATS cung cấp dịch vụ thẩm định và thẩm tra khí nhà kính với trọng tâm là tính toàn vẹn, bằng chứng và sự minh bạch."
      />
      <section className="bg-white py-16 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-[26px] sm:min-h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=90"
              alt="Rừng tự nhiên trong hệ sinh thái xanh"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/65 to-transparent" />
            <p className="absolute bottom-7 left-7 max-w-sm text-2xl font-medium leading-snug text-white">
              Chuyên môn khí hậu. Đảm bảo đáng tin cậy.
            </p>
          </div>
          <div>
            <SectionTitle
              eyebrow="TỔ CHỨC ĐÁNH GIÁ KHÍ HẬU"
              title="Đồng hành cùng doanh nghiệp bằng sự khách quan."
            />
            <p className="mt-5 text-base leading-8 text-ink-muted">
              Tổ chức cần dữ liệu phát thải nhất quán để hiểu tác động, đáp ứng yêu
              cầu báo cáo và lập kế hoạch giảm phát thải. ISATS hỗ trợ đánh giá
              thông tin và dự án khí nhà kính theo tiêu chuẩn, chương trình và
              phạm vi được thống nhất cho từng hợp đồng.
            </p>
            <p className="mt-4 text-base leading-8 text-ink-muted">
              Hoạt động thẩm định và thẩm tra được triển khai với cách tiếp cận
              dựa trên rủi ro, bằng chứng phù hợp và thông tin minh bạch về giới
              hạn đánh giá.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="site-container grid gap-6 md:grid-cols-3">
          {[
            { icon: Eye, title: "Tầm nhìn", text: "Góp phần nâng cao độ tin cậy của thông tin khí hậu và thúc đẩy hành động giảm phát thải có cơ sở." },
            { icon: Target, title: "Sứ mệnh", text: "Cung cấp dịch vụ đánh giá độc lập, nhất quán và minh bạch, phù hợp với tiêu chuẩn được lựa chọn." },
            { icon: HeartHandshake, title: "Cam kết", text: "Bảo vệ tính khách quan, bảo mật thông tin và trao đổi công bằng với các bên liên quan." },
          ].map((item) => (
            <article key={item.title} className="service-card">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand"><item.icon size={22} /></span>
              <h2 className="mt-6 text-xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="site-container">
          <SectionTitle eyebrow="GIÁ TRỊ CỐT LÕI" title="Nguyên tắc trong từng cuộc đánh giá." />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <article key={item.title} className="value-card">
                <item.icon size={24} className="text-brand" />
                <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-subtle">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-darker py-16 text-white sm:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-light">NĂNG LỰC ĐÁNH GIÁ</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">Con người, năng lực và phạm vi rõ ràng.</h2>
            <p className="mt-4 text-base leading-8 text-white/65">
              Nhóm đánh giá có thể bao gồm đánh giá viên trưởng, đánh giá viên
              và chuyên gia kỹ thuật được phân công theo lĩnh vực, mức độ phức
              tạp và tiêu chuẩn áp dụng. Hồ sơ năng lực và phạm vi công nhận cụ
              thể cần được xác nhận trước khi ký hợp đồng.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Đánh giá viên trưởng", text: "Lập kế hoạch, phối hợp nhóm và chịu trách nhiệm về việc tổng hợp kết quả đánh giá." },
              { title: "Đánh giá viên", text: "Rà soát bằng chứng, thực hiện phỏng vấn và ghi nhận phát hiện theo kế hoạch." },
              { title: "Chuyên gia kỹ thuật", text: "Hỗ trợ đánh giá yếu tố chuyên ngành như năng lượng, sản xuất, nông nghiệp hoặc chất thải." },
              { title: "Rà soát độc lập", text: "Xem xét mức độ đầy đủ của hồ sơ trước khi phê duyệt tuyên bố theo quy trình áp dụng." },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <BadgeCheck size={21} className="text-emerald-300" />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="site-container grid gap-8 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">KHUNG TIÊU CHUẨN THAM CHIẾU</p>
            <h2 className="mt-4 text-2xl font-semibold text-ink">ISO/IEC 17029 & ISO 14065</h2>
            <p className="mt-4 text-sm leading-7 text-ink-muted">
              ISO/IEC 17029 quy định nguyên tắc và yêu cầu chung đối với tổ chức
              thẩm định, thẩm tra. ISO 14065 đưa ra yêu cầu cho tổ chức thực
              hiện xác nhận và thẩm tra thông tin môi trường. Việc đề cập tiêu
              chuẩn không đồng nghĩa với tuyên bố ISATS được công nhận; tình
              trạng công nhận, nếu có, phải được xác minh theo phạm vi và cơ
              quan công nhận tương ứng.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-card"><BadgeCheck size={22} /></span>
              <div>
                <h3 className="font-semibold text-ink">Tiêu chuẩn được áp dụng theo phạm vi</h3>
                <p className="mt-2 text-sm leading-7 text-ink-muted">
                  Tiêu chuẩn, chương trình, năng lực nhân sự và điều kiện độc
                  lập được xác định trước mỗi hoạt động. Vui lòng liên hệ ISATS
                  để xác nhận phạm vi hiện hành trước khi sử dụng kết quả đánh giá.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
