import "./globals.css";
import { SessionProvider } from "@/components/layout/session-provider";

export const metadata = {
  title: "HK Legal Case Agency",
  description: "Case management platform for Hong Kong legal agencies."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}