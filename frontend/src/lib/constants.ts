import type {
  ProjectStage,
  ProjectStatus,
  ProjectType,
  StandardType,
  UserRole,
} from "@/types";

export const SITE = {
  name: "ISATS",
  legalName: "Trung tâm Thẩm định và Thẩm tra Khí nhà kính ISATS",
  shortName: "ISATS",
  tagline: "Thẩm định & Thẩm tra Khí nhà kính",
  description:
    "ISATS là tổ chức thẩm định và thẩm tra khí nhà kính độc lập, cung cấp dịch vụ kiểm kê KNK theo ISO 14064 và xác nhận tín chỉ carbon theo VERRA VCS, Gold Standard.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "lienhe@isats.vn",
  phone: "(+84) 28 7300 1998",
  hotline: "1900 6789",
  address:
    "Tầng 8, Toà nhà Green Tower, 68 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
  workingHours: "Thứ 2 – Thứ 6, 08:00 – 17:30 (GMT+7)",
  taxCode: "0316 899 274",
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
] as const;

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Dịch vụ",
    href: "/dich-vu",
    children: [
      {
        label: "Thẩm định kiểm kê KNK",
        href: "/dich-vu/tham-dinh-khi-nha-kinh",
        description:
          "Xác nhận báo cáo kiểm kê KNK cấp tổ chức theo ISO 14064-3",
      },
      {
        label: "Thẩm tra tín chỉ carbon",
        href: "/dich-vu/tham-tra-tin-chi-carbon",
        description: "Xác nhận dự án giảm phát thải và tín chỉ carbon",
      },
      {
        label: "Xây dựng hệ thống MRV",
        href: "/dich-vu/he-thong-mrv",
        description: "Thiết kế hạ tầng đo lường, báo cáo và thẩm tra",
      },
      {
        label: "Đào tạo & Nâng cao năng lực",
        href: "/dich-vu/dao-tao",
        description: "Chương trình đào tạo chuyên gia kiểm kê và thẩm định",
      },
    ],
  },
  {
    label: "Tiêu chuẩn",
    href: "/tieu-chuan",
    children: [
      {
        label: "ISO 14064-1",
        href: "/tieu-chuan/iso-14064-1",
        description: "Định lượng và báo cáo phát thải KNK cấp tổ chức",
      },
      {
        label: "ISO 14064-2",
        href: "/tieu-chuan/iso-14064-2",
        description: "Định lượng, giám sát và báo cáo giảm phát thải dự án",
      },
      {
        label: "ISO 14064-3",
        href: "/tieu-chuan/iso-14064-3",
        description: "Hướng dẫn thẩm định và thẩm tra KNK",
      },
      {
        label: "VERRA VCS",
        href: "/tieu-chuan/verra-vcs",
        description: "Tiêu chuẩn carbon tự nguyện được áp dụng rộng rãi nhất",
      },
      {
        label: "Gold Standard",
        href: "/tieu-chuan/gold-standard",
        description: "Tiêu chuẩn carbon chất lượng cao hướng tới SDGs",
      },
    ],
  },
  { label: "Dự án", href: "/du-an" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const PORTAL_NAV: NavItem[] = [
  { label: "Tổng quan", href: "/portal" },
  { label: "Dự án của tôi", href: "/portal/du-an" },
  { label: "Đăng ký dự án", href: "/portal/du-an/moi" },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Tổng quan", href: "/admin" },
  { label: "Dự án", href: "/admin/du-an" },
  { label: "Thẩm tra", href: "/admin/tham-tra" },
  { label: "Bài viết", href: "/admin/bai-viet" },
  { label: "Người dùng", href: "/admin/nguoi-dung" },
  { label: "Yêu cầu liên hệ", href: "/admin/lien-he" },
];

export const STANDARD_TYPES: readonly StandardType[] = [
  "ISO_14064_1",
  "ISO_14064_2",
  "ISO_14064_3",
  "VERRA_VCS",
  "GOLD_STANDARD",
] as const;

export const STANDARD_LABELS: Record<StandardType, string> = {
  ISO_14064_1: "ISO 14064-1",
  ISO_14064_2: "ISO 14064-2",
  ISO_14064_3: "ISO 14064-3",
  VERRA_VCS: "VERRA VCS",
  GOLD_STANDARD: "Gold Standard",
};

export const STANDARD_DESCRIPTIONS: Record<StandardType, string> = {
  ISO_14064_1:
    "Tiêu chuẩn quốc tế quy định nguyên tắc và yêu cầu định lượng, giám sát, báo cáo phát thải và loại bỏ khí nhà kính ở cấp tổ chức.",
  ISO_14064_2:
    "Hướng dẫn định lượng, giám sát và báo cáo mức giảm phát thải hoặc tăng cường loại bỏ KNK của các dự án giảm phát thải.",
  ISO_14064_3:
    "Quy định nguyên tắc và yêu cầu đối với quá trình thẩm định và thẩm tra báo cáo KNK — cơ sở pháp lý cho hoạt động của ISATS.",
  VERRA_VCS:
    "Tiêu chuẩn carbon tự nguyện hàng đầu thế giới, cung cấp khung xác nhận dự án giảm phát thải và phát hành tín chỉ VCU.",
  GOLD_STANDARD:
    "Tiêu chuẩn carbon chất lượng cao, yêu cầu dự án chứng minh đóng góp cho các Mục tiêu Phát triển Bền vững của Liên Hợp Quốc.",
};

export const PROJECT_TYPES: readonly ProjectType[] = [
  "ghg_inventory",
  "carbon_credit_project",
] as const;

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  ghg_inventory: "Kiểm kê khí nhà kính",
  carbon_credit_project: "Dự án tín chỉ carbon",
};

export const PROJECT_TYPE_OPTIONS = PROJECT_TYPES.map((value) => ({
  value,
  label: PROJECT_TYPE_LABELS[value],
}));

export const STANDARD_OPTIONS = STANDARD_TYPES.map((value) => ({
  value,
  label: STANDARD_LABELS[value],
}));

export const PROJECT_STATUSES: readonly ProjectStatus[] = [
  "submitted",
  "under_review",
  "verification",
  "approved",
  "rejected",
  "on_hold",
] as const;

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  submitted: "Đã tiếp nhận",
  under_review: "Đang xem xét",
  verification: "Đang thẩm tra",
  approved: "Đã xác nhận",
  rejected: "Không đạt",
  on_hold: "Tạm dừng",
};

export const PROJECT_STATUS_OPTIONS = PROJECT_STATUSES.map((value) => ({
  value,
  label: PROJECT_STATUS_LABELS[value],
}));

export type VerificationStageDefinition = {
  key: ProjectStage;
  label: string;
  shortLabel: string;
  description: string;
};

export const VERIFICATION_STAGES: readonly VerificationStageDefinition[] = [
  {
    key: "desk_review",
    label: "Rà soát hồ sơ",
    shortLabel: "Rà soát",
    description:
      "Kiểm tra tính đầy đủ của hồ sơ, phạm vi tổ chức và ranh giới báo cáo.",
  },
  {
    key: "site_visit",
    label: "Đánh giá tại hiện trường",
    shortLabel: "Hiện trường",
    description:
      "Xác minh nguồn số liệu, đồng hồ đo, chứng từ và phỏng vấn nhân sự vận hành.",
  },
  {
    key: "data_assessment",
    label: "Đánh giá dữ liệu & tính toán",
    shortLabel: "Đánh giá",
    description:
      "Tái tính toán hệ số phát thải, kiểm tra sai số và tính không chắc chắn.",
  },
  {
    key: "draft_statement",
    label: "Dự thảo báo cáo thẩm tra",
    shortLabel: "Dự thảo",
    description:
      "Phát hành dự thảo ý kiến thẩm tra để đơn vị gửi phản hồi và giải trình.",
  },
  {
    key: "final_statement",
    label: "Phát hành tuyên bố thẩm tra",
    shortLabel: "Hoàn tất",
    description:
      "Cấp tuyên bố thẩm tra chính thức kèm số hiệu tuyên bố duy nhất.",
  },
] as const;

export const STAGE_LABELS: Record<ProjectStage, string> =
  VERIFICATION_STAGES.reduce(
    (labels, stage) => {
      labels[stage.key] = stage.label;
      return labels;
    },
    {} as Record<ProjectStage, string>,
  );

export const USER_ROLES: readonly UserRole[] = [
  "admin",
  "auditor",
  "client",
  "technical_expert",
] as const;

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Quản trị hệ thống",
  auditor: "Thẩm định viên",
  client: "Khách hàng",
  technical_expert: "Chuyên gia kỹ thuật",
};

export const USER_ROLE_OPTIONS = USER_ROLES.map((value) => ({
  value,
  label: USER_ROLE_LABELS[value],
}));

export const SECTORS = [
  "Năng lượng tái tạo",
  "Sản xuất xi măng",
  "Thép & Kim loại",
  "Dệt may",
  "Chế biến thực phẩm",
  "Chăn nuôi & Nông nghiệp",
  "Lâm nghiệp & Sử dụng đất",
  "Quản lý chất thải",
  "Giao thông vận tải",
  "Bất động sản & Toà nhà",
  "Nhiệt điện",
  "Hoá chất",
] as const;

export const ARTICLE_CATEGORIES = [
  "Chính sách & Pháp lý",
  "Tiêu chuẩn quốc tế",
  "Thị trường carbon",
  "Kiến thức kỹ thuật",
  "Tin ISATS",
] as const;

export const CLIMATE_TARGET_CONTEXT = {
  netZeroYear: 2050,
  netZeroLawYear: 2026,
  etsLaunchYear: 2028,
  mandatoryReportingYear: 2027,
} as const;
