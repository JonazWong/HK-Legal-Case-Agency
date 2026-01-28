"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ClientHomePage() {
  const { data: session } = useSession();
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const name = session?.user?.name || session?.user?.email || (isEn ? "Client" : "客戶");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-teal-dark">
            {isEn ? "Client Portal" : "客戶專區"}
          </h1>
          <p className="text-cool-gray mt-1">
            {isEn ? "Welcome, " : "歡迎你，"}
            {name}
            {isEn
              ? ". Here you can review your cases and communications."
              : "。你可以在這裡查看案件及與律師的溝通紀錄。"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-light-gray rounded-lg bg-off-white">
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            {isEn ? "Coming Soon" : "功能即將推出"}
          </h2>
          <p className="text-sm text-cool-gray">
            {isEn
              ? "Your dedicated client view for cases, documents and messages will appear here. For now, please contact your law firm directly if you need an update."
              : "專為客戶設計的案件、文件及訊息頁面將很快在此推出。如需即時更新，現階段請直接聯絡你的律師或事務所。"}
          </p>
        </div>

        <div className="p-4 border border-light-gray rounded-lg">
          <p className="text-sm text-cool-gray">
            {isEn
              ? "If you believe you should have staff access instead of client access, please reach out to your firm administrator."
              : "如果你認為自己應該使用員工帳戶而非客戶帳戶，請聯絡你們事務所的系統管理員。"}
          </p>
          <div className="mt-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-mint-green text-mint-green hover:bg-mint-green hover:text-white transition-colors"
            >
              {isEn ? "Sign in with a different account" : "以另一個帳戶登入"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
