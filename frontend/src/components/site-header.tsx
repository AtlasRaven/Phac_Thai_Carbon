"use client";

import { useState } from "react";
import { ArrowRight, Leaf, Menu, X } from "lucide-react";

const links = [
  { label: "Dịch vụ", href: "#dich-vu" },
  { label: "Quy trình", href: "#quy-trinh" },
  { label: "Về ISATS", href: "#ve-isats" },
  { label: "Góc nhìn", href: "#tin-tuc" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur-xl">
      <div className="site-container flex h-[76px] items-center justify-between">
        <a
          href="#"
          className="inline-flex items-center gap-3"
          aria-label="ISATS - Trang chủ"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-brand text-white">
            <Leaf size={22} strokeWidth={2} />
          </span>
          <span>
            <span className="block text-[19px] font-bold leading-5 tracking-[0.13em] text-brand">
              ISATS
            </span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.13em] text-ink-subtle">
              CLIMATE ASSURANCE
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Chính">
          {links.map((link) => (
            <a key={link.href} className="nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <a className="header-cta" href="#lien-he">
            Liên hệ
            <ArrowRight size={15} />
          </a>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          className="grid size-10 place-items-center rounded-xl border border-line text-ink lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-line bg-white px-5 pb-5 pt-2 lg:hidden"
          aria-label="Điều hướng di động"
        >
          {links.map((link) => (
            <a
              key={link.href}
              className="mobile-nav-link"
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="button-primary mt-3 w-full justify-center"
            href="#lien-he"
            onClick={() => setIsMenuOpen(false)}
          >
            Liên hệ ISATS
            <ArrowRight size={16} />
          </a>
        </nav>
      )}
    </header>
  );
}
