"use client";
import Image from "next/image";
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Select } from "antd";

import { FLAGS } from "@/lib/constants/locales";
import { routing } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Text } from "@/views/shared/antd/Typography";

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
        <Select.Option
          key={cur}
          value={cur}
          className="locale-switcher__option"
        >
          <div className="locale-switcher__option-wrapper">
            <Image
              className="locale-switcher__flag"
              src={FLAGS[cur]}
              alt={cur}
              width="24"
              height="16"
            />
            <Text className="locale-switcher__text">
              {t("locale", { locale: cur })}
            </Text>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default LocaleSwitcherSelect;
