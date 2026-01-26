import type {Metadata} from "next";
import HomePage from "../page";

export const metadata: Metadata = {
  title: "HK Legal Case Agency",
  description: "Case management platform for Hong Kong legal agencies.",
};

interface LocalePageProps {
  params: {
    locale: string;
  };
}

export default function LocaleHomePage(_props: LocalePageProps) {
  // 目前中英文都使用同一個首頁版面
  return <HomePage />;
}
