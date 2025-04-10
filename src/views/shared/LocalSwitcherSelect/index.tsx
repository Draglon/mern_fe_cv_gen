"use client";
import { routing } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Select } from "antd";
import { useParams } from "next/navigation";

const LocaleSwitcherSelect = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const onChangeLocation = (lang: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error:next-line
        { pathname, params },
        { locale: lang }
      );
    });
  };

  return (
    <Select
      className="locale-switcher"
      defaultValue={locale}
      disabled={isPending}
      onChange={onChangeLocation}
    >
      {routing.locales.map((cur: string) => (
        <Select.Option key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </Select.Option>
      ))}
    </Select>
  );
};

export default LocaleSwitcherSelect;
