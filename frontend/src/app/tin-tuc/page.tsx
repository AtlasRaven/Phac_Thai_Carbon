import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { getPublishedArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tin tức & Thị trường Carbon | ISATS",
  description: "Bài viết chuyên môn về ISO 14064, thị trường carbon và chính sách khí nhà kính.",
};

const categories = ["Tất cả", "ISO 14064", "Thị trường Carbon", "Chính sách GHG"];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, articles] = await Promise.all([
    searchParams,
    getPublishedArticles(),
  ]);
  const selectedCategory = categories.includes(category ?? "") ? category : "Tất cả";
  const filteredArticles =
    selectedCategory === "Tất cả"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <main>
      <PageHeading
        eyebrow="TIN TỨC & THỊ TRƯỜNG CARBON"
        title="Góc nhìn chuyên môn cho hành động khí hậu."
        description="Cập nhật kiến thức kiểm kê khí nhà kính, tiêu chuẩn quốc tế và các vấn đề đang định hình thị trường carbon."
      />
      <section className="bg-surface py-14 sm:py-20">
        <div className="site-container">
          <nav className="mb-9 flex flex-wrap gap-2" aria-label="Lọc danh mục bài viết">
            {categories.map((item) => (
              <Link
                key={item}
                href={item === "Tất cả" ? "/tin-tuc" : `/tin-tuc?category=${encodeURIComponent(item)}`}
                className={`category-pill ${selectedCategory === item ? "category-pill-active" : ""}`}
                aria-current={selectedCategory === item ? "page" : undefined}
              >
                {item}
              </Link>
            ))}
          </nav>
          {filteredArticles.length ? (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article key={article.id} className="insight-card group">
                  <Link href={`/tin-tuc/${article.slug}`} className="block">
                    <div className="relative aspect-[1.55] overflow-hidden rounded-2xl bg-brand-soft">
                      {article.thumbnailUrl && (
                        <Image src={article.thumbnailUrl} alt="" fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      )}
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3 text-[10px] font-bold tracking-[0.12em] text-brand">
                      <span>{article.category ?? "GÓC NHÌN"}</span>
                      <time className="font-medium tracking-normal text-ink-faint" dateTime={article.createdAt.toISOString()}>{formatDate(article.createdAt)}</time>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold leading-snug text-ink group-hover:text-brand">{article.title}</h2>
                    {article.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-subtle">{article.summary}</p>}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-white px-6 py-14 text-center">
              <Newspaper className="mx-auto text-brand" size={28} />
              <h2 className="mt-4 text-lg font-semibold text-ink">Chưa có bài viết trong danh mục này</h2>
              <p className="mt-2 text-sm text-ink-subtle">Các bài viết mới sẽ được cập nhật trong thời gian tới.</p>
            </div>
          )}
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="site-container flex flex-col justify-between gap-5 rounded-2xl bg-brand-tint p-7 sm:flex-row sm:items-center">
          <p className="font-medium text-ink">Cần trao đổi về tiêu chuẩn hoặc báo cáo khí nhà kính?</p>
          <Link href="/lien-he" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">Liên hệ ISATS <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
