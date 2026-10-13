-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'auditor', 'client', 'technical_expert');

-- CreateEnum
CREATE TYPE "project_type" AS ENUM ('ghg_inventory', 'carbon_credit_project');

-- CreateEnum
CREATE TYPE "standard_type" AS ENUM ('ISO_14064_1', 'ISO_14064_2', 'ISO_14064_3', 'VERRA_VCS', 'GOLD_STANDARD');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'client',
    "organization_name" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ghg_projects" (
    "id" UUID NOT NULL,
    "client_id" UUID,
    "project_code" VARCHAR(50) NOT NULL,
    "project_name" VARCHAR(255) NOT NULL,
    "sector" VARCHAR(100) NOT NULL,
    "type" "project_type" NOT NULL,
    "standard" "standard_type" NOT NULL,
    "reporting_period_start" DATE,
    "reporting_period_end" DATE,
    "estimated_emissions_tco2e" DECIMAL(12,2),
    "status" VARCHAR(50) NOT NULL DEFAULT 'submitted',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ghg_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_process" (
    "id" UUID NOT NULL,
    "project_id" UUID,
    "lead_auditor_id" UUID,
    "current_stage" VARCHAR(50) NOT NULL DEFAULT 'desk_review',
    "statement_number" VARCHAR(100),
    "verified_emissions_tco2e" DECIMAL(12,2),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100),
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_inquiries" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "company" VARCHAR(255),
    "subject" VARCHAR(255),
    "message" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ghg_projects_project_code_key" ON "ghg_projects"("project_code");

-- CreateIndex
CREATE UNIQUE INDEX "verification_process_statement_number_key" ON "verification_process"("statement_number");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- AddForeignKey
ALTER TABLE "ghg_projects" ADD CONSTRAINT "ghg_projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_process" ADD CONSTRAINT "verification_process_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "ghg_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_process" ADD CONSTRAINT "verification_process_lead_auditor_id_fkey" FOREIGN KEY ("lead_auditor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
