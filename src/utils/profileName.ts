import { trim } from "ramda";

import { Locales, Locale } from "@/lib/constants/props/locales";

type Profile = {
  firstName: Locale;
  lastName: Locale;
}

const profileName = ({ firstName, lastName }: Profile, locale: Locales): string => firstName && lastName ? trim(`${firstName[locale]} ${lastName[locale]}`) : '-';

export default profileName;
