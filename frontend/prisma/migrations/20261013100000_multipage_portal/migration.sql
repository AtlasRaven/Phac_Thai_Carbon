ALTER TABLE "articles"
ADD COLUMN "author_name" VARCHAR(255);

ALTER TABLE "contact_inquiries"
ADD COLUMN "industry" VARCHAR(100),
ADD COLUMN "requested_standard" VARCHAR(100);

CREATE TABLE "project_documents" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "content_type" VARCHAR(100) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "content" BYTEA NOT NULL,
    "uploaded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_documents_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "corrective_actions" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'open',
    "due_date" DATE,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corrective_actions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "corrective_actions_code_key" ON "corrective_actions"("code");
CREATE INDEX "project_documents_project_id_uploaded_at_idx"
ON "project_documents"("project_id", "uploaded_at");
CREATE INDEX "corrective_actions_project_id_status_idx"
ON "corrective_actions"("project_id", "status");

ALTER TABLE "project_documents"
ADD CONSTRAINT "project_documents_project_id_fkey"
FOREIGN KEY ("project_id") REFERENCES "ghg_projects"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "corrective_actions"
ADD CONSTRAINT "corrective_actions_project_id_fkey"
FOREIGN KEY ("project_id") REFERENCES "ghg_projects"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
