import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, SiteFooter } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISATS | Thẩm định & Thẩm tra Khí nhà kính",
  description:
    "ISATS đồng hành cùng doanh nghiệp kiểm kê khí nhà kính, thẩm định và thẩm tra dự án carbon theo các tiêu chuẩn quốc tế.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
