import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { slug, isPublished: true },
    select: { title: true, summary: true },
  });
  return {
    title: article ? `${article.title} | ISATS` : "Tin tức | ISATS",
    description: article?.summary ?? "Góc nhìn chuyên môn về khí nhà kính và thị trường carbon.",
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findFirst({
    where: { slug, isPublished: true },
  });
  if (!article) notFound();

  const relatedArticles = await prisma.article.findMany({
    where: {
      isPublished: true,
      slug: { not: article.slug },
      ...(article.category ? { category: article.category } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { title: true, slug: true, summary: true },
  });

  return (
    <main>
      <PageHeading
        eyebrow={article.category ?? "GÓC NHÌN CHUYÊN MÔN"}
        title={article.title}
        description={article.summary ?? "Cập nhật kiến thức về kiểm kê khí nhà kính và thị trường carbon."}
      >
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
          <span>{article.authorName ?? "Ban chuyên môn ISATS"}</span>
          <time dateTime={article.createdAt.toISOString()}>{formatDate(article.createdAt)}</time>
        </div>
      </PageHeading>
      <article className="bg-white py-12 sm:py-16">
        <div className="site-container max-w-4xl">
          {article.thumbnailUrl && (
            <div className="relative mb-10 aspect-[1.9] overflow-hidden rounded-3xl bg-brand-soft">
              <Image src={article.thumbnailUrl} alt="" fill priority sizes="(max-width: 1024px) 90vw, 850px" className="object-cover" />
            </div>
          )}
          <div className="prose-isats">
            {article.content.split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <Link href="/tin-tuc" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            <ArrowLeft size={16} /> Tất cả tin tức
          </Link>
        </div>
      </article>
      {relatedArticles.length > 0 && (
        <section className="bg-surface py-14 sm:py-16">
          <div className="site-container">
            <p className="eyebrow">ĐỌC TIẾP</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">Bài viết liên quan</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link key={related.slug} href={`/tin-tuc/${related.slug}`} className="related-article">
                  <h3 className="font-semibold text-ink">{related.title}</h3>
                  {related.summary && <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-subtle">{related.summary}</p>}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">Đọc bài <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
