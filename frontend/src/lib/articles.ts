import { prisma } from "@/lib/db";

export async function getPublishedArticles(limit?: number) {
  return prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });
}
