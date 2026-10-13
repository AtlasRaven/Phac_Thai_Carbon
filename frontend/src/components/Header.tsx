"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  FileCheck2,
  Leaf,
  Menu,
  Search,
  X,
} from "lucide-react";

const serviceLinks = [
  { href: "/dich-vu/iso-14064-1", label: "Thẩm tra kiểm kê GHG", icon: FileCheck2 },
  { href: "/dich-vu/iso-14064-2", label: "Dự án tín chỉ carbon", icon: Leaf },
  { href: "/dich-vu", label: "Tất cả dịch vụ", icon: ArrowRight },
];

const navigation = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/quy-trinh-tham-dinh", label: "Quy trình" },
  { href: "/tin-tuc", label: "Tin tức" },
];

function activeLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesActive = pathname.startsWith("/dich-vu");

  function closeMenus() {
    setIsDrawerOpen(false);
    setIsServicesOpen(false);
  }

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur-xl">
      <div className="site-container flex h-[76px] items-center justify-between">
        <Link href="/" className="inline-flex shrink-0 items-center gap-3" onClick={closeMenus}>
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
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Điều hướng chính">
          <Link href="/" className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}>
            Trang chủ
          </Link>
          {navigation.slice(0, 1).map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${activeLink(pathname, item.href) ? "nav-link-active" : ""}`}>
              {item.label}
            </Link>
          ))}
          <div
            className="nav-dropdown relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              className={`nav-link inline-flex items-center gap-1.5 ${servicesActive ? "nav-link-active" : ""}`}
              aria-expanded={isServicesOpen}
              aria-haspopup="menu"
              onClick={() => setIsServicesOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setIsServicesOpen(false);
              }}
            >
              Dịch vụ thẩm định
              <ArrowDown size={14} />
            </button>
            {isServicesOpen && (
              <div className="nav-dropdown-menu" role="menu">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    className={`nav-dropdown-item ${activeLink(pathname, item.href) ? "nav-dropdown-item-active" : ""}`}
                    onClick={closeMenus}
                  >
                    <item.icon size={17} />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${activeLink(pathname, item.href) ? "nav-link-active" : ""}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/tra-cuu-chung-nhan" className={`nav-link inline-flex items-center gap-1.5 ${activeLink(pathname, "/tra-cuu-chung-nhan") ? "nav-link-active" : ""}`}>
            <Search size={15} /> Tra cứu
          </Link>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/dashboard"
            className={`portal-link ${activeLink(pathname, "/dashboard") || pathname === "/dang-nhap" ? "portal-link-active" : ""}`}
          >
            <Building2 size={16} />
            Cổng doanh nghiệp
          </Link>
          <Link className="header-cta" href="/lien-he">
            Liên hệ
            <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          aria-label={isDrawerOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-navigation"
          className="grid size-10 place-items-center rounded-xl border border-line text-ink xl:hidden"
          onClick={() => setIsDrawerOpen((open) => !open)}
        >
          {isDrawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isDrawerOpen && (
        <div className="mobile-drawer-backdrop xl:hidden" onClick={closeMenus}>
          <nav
            id="mobile-navigation"
            className="mobile-drawer"
            aria-label="Điều hướng di động"
            onClick={(event) => event.stopPropagation()}
          >
            <Link href="/" className={`mobile-nav-link ${pathname === "/" ? "mobile-nav-link-active" : ""}`} onClick={closeMenus}>
              Trang chủ
            </Link>
            {navigation.slice(0, 1).map((item) => (
              <Link key={item.href} href={item.href} className={`mobile-nav-link ${activeLink(pathname, item.href) ? "mobile-nav-link-active" : ""}`} onClick={closeMenus}>
                {item.label}
              </Link>
            ))}
            <details className="mobile-service-group" open={servicesActive}>
              <summary className={servicesActive ? "mobile-nav-link-active" : ""}>
                <span>Dịch vụ thẩm định</span>
                <ArrowDown size={16} />
              </summary>
              {serviceLinks.map((item) => (
                <Link key={item.href} href={item.href} className="mobile-nav-sub-link" onClick={closeMenus}>
                  {item.label}
                </Link>
              ))}
            </details>
            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className={`mobile-nav-link ${activeLink(pathname, item.href) ? "mobile-nav-link-active" : ""}`} onClick={closeMenus}>
                {item.label}
              </Link>
            ))}
            <Link href="/tra-cuu-chung-nhan" className={`mobile-nav-link ${activeLink(pathname, "/tra-cuu-chung-nhan") ? "mobile-nav-link-active" : ""}`} onClick={closeMenus}>
              <Search size={16} /> Tra cứu chứng nhận
            </Link>
            <Link href="/dashboard" className="mobile-nav-link" onClick={closeMenus}>
              <Building2 size={16} /> Cổng doanh nghiệp
            </Link>
            <Link href="/lien-he" className="button-primary mt-4 w-full justify-center" onClick={closeMenus}>
              Liên hệ ISATS
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#071d16] py-10 text-white">
      <div className="site-container">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-300 text-brand-darker">
              <Leaf size={22} strokeWidth={2} />
            </span>
            <span>
              <span className="block text-lg font-bold tracking-[0.13em]">ISATS</span>
              <span className="block text-[9px] tracking-[0.13em] text-white/50">CLIMATE ASSURANCE</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65" aria-label="Liên kết chân trang">
            <Link className="hover:text-white" href="/dich-vu">Dịch vụ</Link>
            <Link className="hover:text-white" href="/gioi-thieu">Giới thiệu</Link>
            <Link className="hover:text-white" href="/quy-trinh-tham-dinh">Quy trình</Link>
            <Link className="hover:text-white" href="/tin-tuc">Tin tức</Link>
            <Link className="hover:text-white" href="/tra-cuu-chung-nhan">Tra cứu chứng nhận</Link>
            <Link className="hover:text-white" href="/lien-he">Liên hệ</Link>
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} ISATS. Thẩm định & thẩm tra khí nhà kính.</p>
          <p>Chuyên môn độc lập cho một tương lai phát thải thấp.</p>
        </div>
      </div>
    </footer>
  );
}
