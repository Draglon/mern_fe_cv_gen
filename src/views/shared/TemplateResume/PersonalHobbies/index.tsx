"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { hobbiesByLocale } from "@/utils/personalHobbies";
import { Text } from "@/views/shared/antd/Typography";

type HobbyProps = {
  hobby: string;
};

type HobbiesProps = {
  personalHobbies: {
    hobbies: Locale;
  };
};

const PersonalHobbies = ({ personalHobbies }: HobbiesProps) => {
  const locale = useLocale();
  const hobbies = hobbiesByLocale(personalHobbies, locale as Locales);

  return (
    <div className="personal-interests">
      <ul className="personal-interests__list">
        {hobbies.map(({ hobby }: HobbyProps, index: number) => (
          <li className="personal-interests__item" key={index}>
            <Text className="personal-interests__text">{hobby}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalHobbies;
