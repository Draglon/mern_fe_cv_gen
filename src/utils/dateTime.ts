import dayjs from "@/lib/dayjs";
import { Locales } from "@/lib/constants/props/locales";
import { DEFAULT_LOCALE } from "@/lib/constants/locales";

type TFunction = (
  key: string,
  values?: Record<string, string | number>
) => string;

export type formatDateRangeType = {
  startDate?: string;
  endDate?: string | null;
  locale: Locales;
  tShared: TFunction;
};

const getCurrentLocale = (locale: Locales) => {
  if (!locale) return DEFAULT_LOCALE;

  return locale === "ua" ? "uk" : locale;
}

const dayjsByCurrentLocale = (date: string, locale: Locales) => dayjs(date).locale(getCurrentLocale(locale));
const shortMonthYearFormat = (date: string, locale: Locales) => dayjsByCurrentLocale(date, locale).format("MMM YYYY").toLowerCase();

export const formatDate = (date: string, locale: Locales) => {
  if (!date) return "";

  return dayjsByCurrentLocale(date, locale).format("DD MMM YYYY").toLowerCase();
};

export const formatDateRange = ({
  startDate,
  endDate,
  locale,
  tShared,
}: formatDateRangeType) => {
  if (!startDate) return "";

  const currentTime = tShared("currentTime").toLowerCase();

  return `${shortMonthYearFormat(startDate, locale)} - ${endDate ? shortMonthYearFormat(endDate, locale) : currentTime}`;
};
