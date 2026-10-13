"use client";

import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";
import type { ApiResult } from "@/types";

type ContactResponse = ApiResult<{ id: string }>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.ok) {
        setMessage({
          type: "error",
          text: result.ok
            ? "Không thể gửi yêu cầu. Vui lòng thử lại sau."
            : result.error,
        });
        return;
      }

      form.reset();
      setMessage({
        type: "success",
        text: "Cảm ơn bạn. Đội ngũ ISATS sẽ liên hệ trong thời gian sớm nhất.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Chưa thể kết nối để gửi yêu cầu. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="form-field">
          Họ và tên <span aria-hidden="true">*</span>
          <input
            autoComplete="name"
            name="fullName"
            placeholder="Nguyễn Văn A"
            required
            maxLength={255}
          />
        </label>
        <label className="form-field">
          Email <span aria-hidden="true">*</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="ban@congty.vn"
            required
            maxLength={255}
            type="email"
          />
        </label>
        <label className="form-field">
          Số điện thoại
          <input
            autoComplete="tel"
            name="phone"
            placeholder="090 123 4567"
            maxLength={50}
            type="tel"
          />
        </label>
        <label className="form-field">
          Doanh nghiệp
          <input
            autoComplete="organization"
            name="company"
            placeholder="Tên doanh nghiệp"
            maxLength={255}
          />
        </label>
        <label className="form-field">
          Lĩnh vực hoạt động
          <select name="industry" defaultValue="">
            <option value="">Chọn lĩnh vực</option>
            <option value="Năng lượng">Năng lượng</option>
            <option value="Sản xuất">Sản xuất</option>
            <option value="Nông nghiệp">Nông nghiệp</option>
            <option value="Giao thông vận tải">Giao thông vận tải</option>
            <option value="Khác">Khác</option>
          </select>
        </label>
        <label className="form-field">
          Tiêu chuẩn quan tâm
          <select name="standard" defaultValue="">
            <option value="">Chọn tiêu chuẩn</option>
            <option value="ISO 14064-1">ISO 14064-1</option>
            <option value="ISO 14064-2">ISO 14064-2</option>
            <option value="ISO 14064-3">ISO 14064-3</option>
            <option value="Verra VCS">Verra VCS</option>
            <option value="Gold Standard">Gold Standard</option>
          </select>
        </label>
      </div>
      <label className="form-field">
        Nội dung cần tư vấn <span aria-hidden="true">*</span>
        <textarea
          name="message"
          placeholder="Bạn đang quan tâm đến dịch vụ nào?"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
        />
      </label>
      {message && (
        <p
          aria-live="polite"
          className={
            message.type === "success"
              ? "form-feedback form-feedback-success"
              : "form-feedback form-feedback-error"
          }
        >
          {message.type === "success" && <Check size={17} />}
          {message.text}
        </p>
      )}
      <button className="button-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle size={17} className="animate-spin" />
            Đang gửi...
          </>
        ) : (
          "Gửi yêu cầu tư vấn"
        )}
      </button>
      <p className="text-xs leading-5 text-ink-faint">
        Thông tin của bạn chỉ được sử dụng để phản hồi yêu cầu tư vấn.
      </p>
    </form>
  );
}
