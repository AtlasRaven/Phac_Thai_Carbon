import { hash } from "bcryptjs";
import {
  PrismaClient,
  ProjectType,
  StandardType,
  UserRole,
} from "@prisma/client";

const prisma = new PrismaClient();

/** Every demo account shares this password so the app is easy to trial. */
const DEMO_PASSWORD = "Isats@2026";

type SeedUser = {
  key: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  organizationName: string | null;
};

const SEED_USERS: SeedUser[] = [
  {
    key: "admin",
    fullName: "Nguyễn Minh Quân",
    email: "admin@isats.vn",
    phone: "0901234567",
    role: UserRole.admin,
    organizationName: "ISATS",
  },
  {
    key: "lead",
    fullName: "Trần Thị Hồng Nhung",
    email: "auditor@isats.vn",
    phone: "0912345678",
    role: UserRole.auditor,
    organizationName: "ISATS",
  },
  {
    key: "auditor2",
    fullName: "Lê Quốc Bảo",
    email: "bao.le@isats.vn",
    phone: "0913456789",
    role: UserRole.auditor,
    organizationName: "ISATS",
  },
  {
    key: "expert",
    fullName: "Phạm Anh Tuấn",
    email: "expert@isats.vn",
    phone: "0914567890",
    role: UserRole.technical_expert,
    organizationName: "ISATS",
  },
  {
    key: "clientA",
    fullName: "Vũ Hoàng Nam",
    email: "client@isats.vn",
    phone: "0987654321",
    role: UserRole.client,
    organizationName: "Công ty CP Năng lượng tái tạo Mekong",
  },
  {
    key: "clientB",
    fullName: "Đặng Thu Trang",
    email: "trang.dang@ximangviet.vn",
    phone: "0977123456",
    role: UserRole.client,
    organizationName: "Tổng công ty Xi măng Việt Nam",
  },
  {
    key: "clientC",
    fullName: "Bùi Đức Thắng",
    email: "thang.bui@detmayphuongdong.vn",
    phone: "0966234567",
    role: UserRole.client,
    organizationName: "Dệt may Phương Đông",
  },
  {
    key: "clientD",
    fullName: "Hoàng Mai Linh",
    email: "linh.hoang@agriviet.vn",
    phone: "0955345678",
    role: UserRole.client,
    organizationName: "Nông nghiệp Xanh AgriViet",
  },
];

type SeedProject = {
  key: string;
  clientKey: string;
  projectCode: string;
  projectName: string;
  sector: string;
  type: ProjectType;
  standard: StandardType;
  reportingPeriodStart: string;
  reportingPeriodEnd: string;
  estimatedEmissionsTco2e: number | null;
  status: string;
};

const SEED_PROJECTS: SeedProject[] = [
  {
    key: "p1",
    clientKey: "clientA",
    projectCode: "ISATS-2026-GHG-001",
    projectName: "Kiểm kê KNK Nhà máy điện mặt trời Trà Vinh",
    sector: "Năng lượng tái tạo",
    type: ProjectType.ghg_inventory,
    standard: StandardType.ISO_14064_1,
    reportingPeriodStart: "2025-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 18420.5,
    status: "approved",
  },
  {
    key: "p2",
    clientKey: "clientA",
    projectCode: "ISATS-2026-CCP-002",
    projectName: "Dự án điện gió Bạc Liêu giai đoạn III",
    sector: "Năng lượng tái tạo",
    type: ProjectType.carbon_credit_project,
    standard: StandardType.VERRA_VCS,
    reportingPeriodStart: "2024-07-01",
    reportingPeriodEnd: "2025-06-30",
    estimatedEmissionsTco2e: 126800.0,
    status: "verification",
  },
  {
    key: "p3",
    clientKey: "clientB",
    projectCode: "ISATS-2026-GHG-003",
    projectName: "Kiểm kê KNK Tổ hợp xi măng Hà Tiên - Kiên Giang",
    sector: "Sản xuất xi măng",
    type: ProjectType.ghg_inventory,
    standard: StandardType.ISO_14064_1,
    reportingPeriodStart: "2025-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 1284500.75,
    status: "verification",
  },
  {
    key: "p4",
    clientKey: "clientB",
    projectCode: "ISATS-2026-CCP-004",
    projectName:
      "Thu hồi nhiệt thải và phát điện dư nhà máy xi măng Bình Dương",
    sector: "Sản xuất xi măng",
    type: ProjectType.carbon_credit_project,
    standard: StandardType.GOLD_STANDARD,
    reportingPeriodStart: "2024-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 96400.0,
    status: "under_review",
  },
  {
    key: "p5",
    clientKey: "clientC",
    projectCode: "ISATS-2026-GHG-005",
    projectName: "Kiểm kê KNK chuỗi nhà máy dệt may Phương Đông",
    sector: "Dệt may",
    type: ProjectType.ghg_inventory,
    standard: StandardType.ISO_14064_1,
    reportingPeriodStart: "2025-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 45890.25,
    status: "submitted",
  },
  {
    key: "p6",
    clientKey: "clientC",
    projectCode: "ISATS-2026-GHG-006",
    projectName: "Kiểm kê KNK nhà máy nhuộm Long An theo CBAM",
    sector: "Dệt may",
    type: ProjectType.ghg_inventory,
    standard: StandardType.ISO_14064_1,
    reportingPeriodStart: "2025-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 23110.0,
    status: "under_review",
  },
  {
    key: "p7",
    clientKey: "clientD",
    projectCode: "ISATS-2026-CCP-007",
    projectName: "Dự án lúa - tôm giảm phát thải Cà Mau",
    sector: "Chăn nuôi & Nông nghiệp",
    type: ProjectType.carbon_credit_project,
    standard: StandardType.VERRA_VCS,
    reportingPeriodStart: "2023-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 74250.0,
    status: "approved",
  },
  {
    key: "p8",
    clientKey: "clientD",
    projectCode: "ISATS-2026-CCP-008",
    projectName: "Trồng rừng và phục hồi rừng ngập mặn Cần Giờ",
    sector: "Lâm nghiệp & Sử dụng đất",
    type: ProjectType.carbon_credit_project,
    standard: StandardType.GOLD_STANDARD,
    reportingPeriodStart: "2022-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 189300.0,
    status: "verification",
  },
  {
    key: "p9",
    clientKey: "clientA",
    projectCode: "ISATS-2026-GHG-009",
    projectName: "Kiểm kê KNK trụ sở và trung tâm dữ liệu Agriviet",
    sector: "Bất động sản & Toà nhà",
    type: ProjectType.ghg_inventory,
    standard: StandardType.ISO_14064_1,
    reportingPeriodStart: "2025-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 3260.4,
    status: "on_hold",
  },
  {
    key: "p10",
    clientKey: "clientB",
    projectCode: "ISATS-2026-CCP-010",
    projectName: "Dự án phát điện sinh khối từ bã mía Sóc Trăng",
    sector: "Quản lý chất thải",
    type: ProjectType.carbon_credit_project,
    standard: StandardType.VERRA_VCS,
    reportingPeriodStart: "2024-01-01",
    reportingPeriodEnd: "2025-12-31",
    estimatedEmissionsTco2e: 112500.0,
    status: "rejected",
  },
];

type SeedVerification = {
  projectKey: string;
  auditorKey: string | null;
  currentStage: string;
  statementNumber: string | null;
  verifiedEmissionsTco2e: number | null;
};

const SEED_VERIFICATIONS: SeedVerification[] = [
  {
    projectKey: "p1",
    auditorKey: "lead",
    currentStage: "final_statement",
    statementNumber: "ISATS-VS-2026-0001",
    verifiedEmissionsTco2e: 18397.12,
  },
  {
    projectKey: "p2",
    auditorKey: "lead",
    currentStage: "site_visit",
    statementNumber: null,
    verifiedEmissionsTco2e: null,
  },
  {
    projectKey: "p3",
    auditorKey: "auditor2",
    currentStage: "data_assessment",
    statementNumber: null,
    verifiedEmissionsTco2e: null,
  },
  {
    projectKey: "p4",
    auditorKey: "auditor2",
    currentStage: "desk_review",
    statementNumber: null,
    verifiedEmissionsTco2e: null,
  },
  {
    projectKey: "p7",
    auditorKey: "lead",
    currentStage: "final_statement",
    statementNumber: "ISATS-VS-2026-0002",
    verifiedEmissionsTco2e: 74810.9,
  },
  {
    projectKey: "p8",
    auditorKey: "auditor2",
    currentStage: "draft_statement",
    statementNumber: null,
    verifiedEmissionsTco2e: null,
  },
  {
    projectKey: "p10",
    auditorKey: "auditor2",
    currentStage: "desk_review",
    statementNumber: null,
    verifiedEmissionsTco2e: null,
  },
];

type SeedArticle = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
};

const SEED_ARTICLES: SeedArticle[] = [
  {
    title: "Bắt đầu kiểm kê phát thải: doanh nghiệp cần chuẩn bị gì?",
    slug: "bat-dau-kiem-ke-phat-thai-doanh-nghiep-can-chuan-bi-gi",
    category: "Kiểm kê khí nhà kính",
    summary:
      "Một số bước chuẩn bị về phạm vi, dữ liệu hoạt động và trách nhiệm nội bộ giúp doanh nghiệp xây dựng kiểm kê khí nhà kính có cơ sở.",
    content:
      "Kiểm kê khí nhà kính bắt đầu từ việc xác định mục tiêu và ranh giới tổ chức. Doanh nghiệp cần thống nhất đơn vị, cơ sở hoạt động thuộc phạm vi báo cáo và giai đoạn kiểm kê.\n\nTiếp theo, hãy phân công đầu mối thu thập dữ liệu cho từng nguồn phát thải. Hóa đơn nhiên liệu, dữ liệu tiêu thụ điện, hoạt động vận tải và quy trình sản xuất là những hồ sơ thường được rà soát. Lưu lại nguồn, kỳ dữ liệu và cách quy đổi để bảo đảm khả năng truy xuất.\n\nKhi đã có dữ liệu, doanh nghiệp có thể đánh giá tính đầy đủ, lựa chọn phương pháp phù hợp và ghi nhận các giả định. Một quy trình kiểm soát nội bộ rõ ràng sẽ hỗ trợ việc rà soát và thẩm tra độc lập.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "ISO 14064-1 và những nguyên tắc cốt lõi trong báo cáo KNK",
    slug: "iso-14064-1-nguyen-tac-bao-cao-khi-nha-kinh",
    category: "Tiêu chuẩn quốc tế",
    summary:
      "Tìm hiểu các nguyên tắc về tính phù hợp, tính đầy đủ, tính nhất quán, tính chính xác và tính minh bạch khi lập báo cáo.",
    content:
      "ISO 14064-1 đưa ra các nguyên tắc và yêu cầu ở cấp tổ chức để định lượng, báo cáo phát thải và loại bỏ khí nhà kính. Tiêu chuẩn giúp tổ chức xây dựng cách tiếp cận nhất quán cho chương trình kiểm kê.\n\nTính phù hợp bảo đảm thông tin đáp ứng nhu cầu sử dụng dự kiến. Tính đầy đủ yêu cầu xem xét các nguồn phát thải thuộc phạm vi đã xác định. Tính nhất quán giúp so sánh theo thời gian, trong khi tính chính xác và minh bạch hỗ trợ người đọc hiểu phương pháp và cơ sở dữ liệu.\n\nViệc áp dụng tiêu chuẩn cần gắn với bối cảnh, ranh giới và mục tiêu của từng tổ chức. Đánh giá độc lập có thể giúp kiểm tra cách thực hiện và độ tin cậy của thông tin được báo cáo.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Tính toàn vẹn môi trường trong một dự án tín chỉ carbon",
    slug: "tinh-toan-ven-moi-truong-du-an-tin-chi-carbon",
    category: "Thị trường carbon",
    summary:
      "Đường cơ sở, tính bổ sung, lượng hóa và giám sát là các khía cạnh cần được xem xét trong đánh giá dự án carbon.",
    content:
      "Một dự án tín chỉ carbon cần mô tả rõ hoạt động, ranh giới và phương pháp luận được áp dụng. Đường cơ sở là cơ sở để ước tính mức phát thải hoặc loại bỏ trong kịch bản không có hoạt động dự án.\n\nTính bổ sung xem xét liệu kết quả giảm phát thải có vượt ngoài kịch bản thông thường hay không. Dữ liệu giám sát, cách lượng hóa và các giả định cần được ghi nhận có hệ thống để kết quả có thể được kiểm tra.\n\nThẩm định thiết kế và thẩm tra kết quả là những bước đánh giá độc lập theo chương trình hoặc tiêu chuẩn liên quan. Phạm vi và kết luận cụ thể phụ thuộc vào yêu cầu áp dụng cũng như bằng chứng sẵn có.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=85",
  },
];

async function seedUsers(): Promise<Map<string, string>> {
  const passwordHash = await hash(DEMO_PASSWORD, 10);
  const ids = new Map<string, string>();

  for (const user of SEED_USERS) {
    const record = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        organizationName: user.organizationName,
        passwordHash,
        isActive: true,
      },
      create: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        organizationName: user.organizationName,
        passwordHash,
        isActive: true,
      },
      select: { id: true },
    });
    ids.set(user.key, record.id);
  }

  return ids;
}

async function seedProjects(
  userIds: Map<string, string>,
): Promise<Map<string, string>> {
  const ids = new Map<string, string>();

  for (const project of SEED_PROJECTS) {
    const clientId = userIds.get(project.clientKey);
    if (!clientId) {
      throw new Error(`Unknown client key in seed: ${project.clientKey}`);
    }

    const record = await prisma.ghgProject.upsert({
      where: { projectCode: project.projectCode },
      update: {
        clientId,
        projectName: project.projectName,
        sector: project.sector,
        type: project.type,
        standard: project.standard,
        reportingPeriodStart: new Date(project.reportingPeriodStart),
        reportingPeriodEnd: new Date(project.reportingPeriodEnd),
        estimatedEmissionsTco2e: project.estimatedEmissionsTco2e,
        status: project.status,
      },
      create: {
        clientId,
        projectCode: project.projectCode,
        projectName: project.projectName,
        sector: project.sector,
        type: project.type,
        standard: project.standard,
        reportingPeriodStart: new Date(project.reportingPeriodStart),
        reportingPeriodEnd: new Date(project.reportingPeriodEnd),
        estimatedEmissionsTco2e: project.estimatedEmissionsTco2e,
        status: project.status,
      },
      select: { id: true },
    });
    ids.set(project.key, record.id);
  }

  return ids;
}

async function seedVerifications(
  projectIds: Map<string, string>,
  userIds: Map<string, string>,
): Promise<void> {
  for (const verification of SEED_VERIFICATIONS) {
    const projectId = projectIds.get(verification.projectKey);
    if (!projectId) {
      throw new Error(
        `Unknown project key in seed: ${verification.projectKey}`,
      );
    }

    const existing = await prisma.verificationProcess.findFirst({
      where: { projectId },
      select: { id: true },
    });

    const leadAuditorId = verification.auditorKey
      ? (userIds.get(verification.auditorKey) ?? null)
      : null;

    const payload = {
      projectId,
      leadAuditorId,
      currentStage: verification.currentStage,
      statementNumber: verification.statementNumber,
      verifiedEmissionsTco2e: verification.verifiedEmissionsTco2e,
    };

    if (existing) {
      await prisma.verificationProcess.update({
        where: { id: existing.id },
        data: payload,
      });
    } else {
      await prisma.verificationProcess.create({ data: payload });
    }
  }
}

async function seedArticles(): Promise<void> {
  for (const article of SEED_ARTICLES) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        category: article.category,
        summary: article.summary,
        content: article.content,
        thumbnailUrl: article.thumbnailUrl,
        isPublished: true,
      },
      create: {
        ...article,
        isPublished: true,
      },
    });
  }
}

async function main(): Promise<void> {
  const userIds = await seedUsers();
  const projectIds = await seedProjects(userIds);
  await seedVerifications(projectIds, userIds);
  await seedArticles();

  console.info(
    `ISATS seed completed: ${SEED_USERS.length} users, ${SEED_PROJECTS.length} projects, ${SEED_VERIFICATIONS.length} verifications, ${SEED_ARTICLES.length} articles.`,
  );
  console.info(`Demo account password: ${DEMO_PASSWORD}`);
}

main()
  .catch((error: unknown) => {
    console.error("Failed to seed the ISATS database.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
