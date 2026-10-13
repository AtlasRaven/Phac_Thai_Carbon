"use client";

import { FormEvent, useState } from "react";
import { Upload } from "lucide-react";

type ProjectOption = { id: string; projectName: string; projectCode: string };

export function ProjectUploadForm({ projects }: { projects: ProjectOption[] }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/dashboard/documents", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Không thể tải tài liệu lên.");
      setMessage("Tài liệu đã được gửi cho nhóm đánh giá.");
      form.reset();
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Không thể tải tài liệu lên.");
    } finally {
      setPending(false);
    }
  }

  return <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
    <label className="form-field">Dự án
      <select name="projectId" required className="min-h-11 rounded-lg border border-line-strong bg-white px-3 text-sm font-normal text-ink">
        <option value="">Chọn dự án</option>
        {projects.map((project) => <option key={project.id} value={project.id}>{project.projectCode} · {project.projectName}</option>)}
      </select>
    </label>
    <label className="form-field">Tài liệu
      <input name="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.csv" required className="text-xs font-normal file:mr-3 file:rounded-lg file:border-0 file:bg-brand-soft file:px-3 file:py-2 file:font-semibold file:text-brand" />
    </label>
    <button type="submit" disabled={pending} className="button-submit"><Upload size={16} />{pending ? "Đang gửi…" : "Gửi tài liệu"}</button>
    {message && <p role="status" className="text-xs leading-5 text-brand">{message}</p>}
  </form>;
}
