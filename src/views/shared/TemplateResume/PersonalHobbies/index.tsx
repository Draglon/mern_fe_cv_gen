"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { Text } from "@/views/shared/antd/Typography";

type HobbyProps = {
  hobby: string;
};

type HobbiesProps = {
  hobbies: {
    hobbies: Locale;
  };
};

const PersonalHobbies = ({ hobbies }: HobbiesProps) => {
  const locale = useLocale();
  const hobbiesByLocale = JSON.parse(
    hobbies?.hobbies[locale as Locales] || "[]"
  );

  return (
    <div className="personal-interests">
      <ul className="personal-interests__list">
        {hobbiesByLocale.map(({ hobby }: HobbyProps, index: number) => (
          <li className="personal-interests__item" key={index}>
            <Text className="personal-interests__text">{hobby}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalHobbies;
