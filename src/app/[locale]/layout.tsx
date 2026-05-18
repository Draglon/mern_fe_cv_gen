import clsx from "clsx";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import ThemeProvider from "@/providers/themeProvider";
import NotificationProvider from "@/providers/notificationProvider";
import StoreProvider from "@/store/StoreProvider";
import "@/app/styles.scss";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("layout.title"),
    description: t("layout.description"),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const messages = await getMessages();
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={clsx(roboto.className)}
      suppressHydrationWarning
    >
      <body>
        <StoreProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <NotificationProvider>{children}</NotificationProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
