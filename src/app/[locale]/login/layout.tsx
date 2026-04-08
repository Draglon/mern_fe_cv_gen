import { getTranslations } from "next-intl/server";

import { Locales } from "@/lib/constants/props/locales";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locales }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Login" });

  return {
    title: t("layout.title"),
    description: t("layout.description"),
  };
}

export { default } from "@/views/layouts/GuestLayout";
