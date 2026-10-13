/**
 * Domain types shared by the ISATS data layer, API routes and UI.
 *
 * Enum unions mirror the PostgreSQL enums declared in
 * `prisma/schema.prisma` so that client components never import the
 * generated Prisma client (which must stay server-only).
 */

export type UserRole = "admin" | "auditor" | "client" | "technical_expert";

export type ProjectType = "ghg_inventory" | "carbon_credit_project";

export type StandardType =
  | "ISO_14064_1"
  | "ISO_14064_2"
  | "ISO_14064_3"
  | "VERRA_VCS"
  | "GOLD_STANDARD";

export type ProjectStatus =
  | "submitted"
  | "under_review"
  | "verification"
  | "approved"
  | "rejected"
  | "on_hold";

export type ProjectStage =
  | "desk_review"
  | "site_visit"
  | "data_assessment"
  | "draft_statement"
  | "final_statement";

/** The authenticated identity attached to a session cookie. */
export type SessionUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  organizationName: string | null;
};

export type UserSummary = SessionUser & {
  phone: string | null;
  isActive: boolean;
  createdAt: string;
};

export type Project = {
  id: string;
  projectCode: string;
  projectName: string;
  sector: string;
  type: ProjectType;
  standard: StandardType;
  reportingPeriodStart: string | null;
  reportingPeriodEnd: string | null;
  estimatedEmissionsTco2e: number | null;
  status: ProjectStatus;
  createdAt: string;
  clientId: string | null;
};

export type ProjectWithClient = Project & {
  client: Pick<
    UserSummary,
    "id" | "fullName" | "email" | "organizationName"
  > | null;
};

export type VerificationProcessRecord = {
  id: string;
  projectId: string | null;
  leadAuditorId: string | null;
  currentStage: ProjectStage;
  statementNumber: string | null;
  verifiedEmissionsTco2e: number | null;
  createdAt: string;
  leadAuditor: Pick<UserSummary, "id" | "fullName" | "email"> | null;
};

export type ProjectDetail = ProjectWithClient & {
  verification: VerificationProcessRecord | null;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  summary: string | null;
  content: string;
  thumbnailUrl: string | null;
  isPublished: boolean;
  createdAt: string;
};

export type ArticleSummary = Omit<Article, "content">;

export type ContactInquiry = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: "new" | "in_progress" | "resolved";
  createdAt: string;
};

export type PlatformStats = {
  totalProjects: number;
  verifiedProjects: number;
  activeVerifications: number;
  verifiedEmissionsTco2e: number;
  publishedArticles: number;
  totalClients: number;
};

/** Uniform JSON envelope returned by every API route. */
export type ApiSuccess<TData> = {
  ok: true;
  data: TData;
};

export type ApiFailure = {
  ok: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
};

export type ApiResult<TData> = ApiSuccess<TData> | ApiFailure;

export type Paginated<TItem> = {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
