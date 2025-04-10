import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<any> | undefined;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Registration" });

  return {
    title: t("layout.title"),
    description: t("layout.description"),
  };
}

export { default } from "@/views/layouts/GuestLayout";
