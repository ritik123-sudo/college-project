import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav"; 
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BizGenius AI",
  description: "AI-Powered Business Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* 1. Notifications (Always on top) */}
        <Toaster position="top-right" />
        
        {/* Main Layout Container: Vertical on Mobile, Horizontal on Desktop */}
        <div className="flex flex-col md:flex-row min-h-screen">
          
          {/* 2. Mobile Navigation (The component itself handles being hidden on Desktop) */}
          <MobileNav />

          {/* 3. Desktop Sidebar (Hidden on Mobile) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* 4. Main Content Area */}
          {/* Height calc ensures scrolling works under the mobile header */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}