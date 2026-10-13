import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileCheck2, FileSearch, MapPinned, MessagesSquare } from "lucide-react";
import { PageHeading, SectionTitle } from "@/components/page-heading";

export const metadata = {
  title: "Quy trình thẩm định & thẩm tra | ISATS",
  description: "Năm bước trong quy trình tiếp nhận, đánh giá, xử lý phát hiện và phát hành tuyên bố của ISATS.",
};

const steps = [
  {
    number: "01",
    title: "Tiếp nhận & đánh giá sơ bộ",
    subtitle: "Xác định mục tiêu, phạm vi và tiêu chí",
    icon: ClipboardCheck,
    text: "ISATS tiếp nhận thông tin về tổ chức hoặc dự án, mục tiêu đánh giá, kỳ báo cáo, tiêu chuẩn/chương trình và địa điểm liên quan. Hai bên trao đổi sơ bộ về khả năng thực hiện, thời gian và nguồn lực cần thiết.",
    evidence: ["Phạm vi dự kiến", "Tiêu chuẩn áp dụng", "Đầu mối và kế hoạch sơ bộ"],
  },
  {
    number: "02",
    title: "Đánh giá tài liệu · Desk Review",
    subtitle: "Rà soát hồ sơ trước hoạt động đánh giá",
    icon: FileSearch,
    text: "Nhóm đánh giá xem xét tài liệu, phương pháp luận, ranh giới, giả định, dữ liệu và hệ thống kiểm soát liên quan. Các nội dung cần làm rõ được tổng hợp để thống nhất kế hoạch đánh giá.",
    evidence: ["Báo cáo và tài liệu nền", "Nguồn dữ liệu & phép tính", "Danh sách nội dung cần làm rõ"],
  },
  {
    number: "03",
    title: "Khảo sát thực địa · Site Visit",
    subtitle: "Đối chiếu hoạt động và bằng chứng",
    icon: MapPinned,
    text: "Tùy phạm vi, nhóm đánh giá phỏng vấn nhân sự, quan sát hoạt động, đối chiếu hồ sơ gốc và kiểm tra đường đi của dữ liệu. Hình thức và địa điểm khảo sát được thống nhất trước.",
    evidence: ["Phỏng vấn đầu mối", "Quan sát tại địa điểm", "Đối chiếu dữ liệu và hồ sơ"],
  },
  {
    number: "04",
    title: "Xử lý sai biệt & CARs",
    subtitle: "Phản hồi phát hiện và khắc phục",
    icon: MessagesSquare,
    text: "Phát hiện được trao đổi, phân loại và ghi nhận theo tiêu chí áp dụng. Khi có yêu cầu hành động khắc phục (CAR), tổ chức phản hồi bằng bằng chứng; nhóm đánh giá xem xét tính phù hợp trước khi kết luận.",
    evidence: ["Phát hiện được lập thành hồ sơ", "Phản hồi và bằng chứng khắc phục", "Rà soát tính đầy đủ của phản hồi"],
  },
  {
    number: "05",
    title: "Cấp tuyên bố thẩm tra",
    subtitle: "Rà soát độc lập và phát hành kết quả",
    icon: FileCheck2,
    text: "Hồ sơ được rà soát theo quy trình phê duyệt trước khi phát hành tuyên bố/kết luận. Văn bản nêu rõ phạm vi, tiêu chí, kỳ đánh giá và kết quả; thông tin tra cứu công khai chỉ hiển thị khi có tuyên bố đủ điều kiện công bố.",
    evidence: ["Rà soát hồ sơ hoàn chỉnh", "Phê duyệt kết luận theo thẩm quyền", "Phát hành tuyên bố theo phạm vi"],
  },
];

export default function ProcessPage() {
  return (
    <main>
      <PageHeading
        eyebrow="QUY TRÌNH ĐÁNH GIÁ"
        title="Năm bước rõ ràng, xuyên suốt."
        description="Quy trình thẩm định và thẩm tra được thiết kế theo tiêu chuẩn, phạm vi công việc và rủi ro của từng hoạt động."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="site-container">
          <SectionTitle
            eyebrow="TỪ TIẾP NHẬN ĐẾN TUYÊN BỐ"
            title="Doanh nghiệp luôn nắm được bước tiếp theo."
            description="Thời lượng và mức độ chi tiết thay đổi theo quy mô, mức đảm bảo, tiêu chí và yêu cầu chương trình đã thống nhất."
          />
          <ol className="process-timeline mt-11">
            {steps.map((step) => (
              <li className="process-timeline-item" key={step.number}>
                <div className="process-timeline-marker">{step.number}</div>
                <article className="process-timeline-card">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.12em] text-brand">{step.subtitle}</p>
                      <h2 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">{step.title}</h2>
                    </div>
                    <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand"><step.icon size={23} /></span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-muted">{step.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {step.evidence.map((item) => (
                      <span className="service-tag" key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-brand-darker py-14 text-white">
        <div className="site-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Cần chuẩn bị cho một cuộc đánh giá?</h2>
            <p className="mt-2 text-sm text-white/65">Liên hệ ISATS để trao đổi phạm vi và hồ sơ cần thiết.</p>
          </div>
          <Link className="button-primary shrink-0" href="/lien-he">Trao đổi cùng ISATS <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
