import { Locales, Locale } from "@/lib/constants/props/locales";

type SectionTitleProps = {
  data: {
    sectionTitle?: Locale;
  },
  locale: Locales;
  defaultTitle: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ data, locale, defaultTitle }: SectionTitleProps) => data?.sectionTitle?.[locale] ? data.sectionTitle[locale] : defaultTitle;
