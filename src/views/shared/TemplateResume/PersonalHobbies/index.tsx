"use client";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalHobbiesProps } from "@/lib/constants/props/resume";
import { hobbiesByLocale } from "@/utils/personalHobbies";

import { Text } from "@/views/shared/antd/Typography";

type HobbyProps = {
  hobby: string;
};

type HobbiesProps = {
  templateLanguage: Locales;
  personalHobbies: PersonalHobbiesProps;
};

const PersonalHobbies = ({
  templateLanguage,
  personalHobbies,
}: HobbiesProps) => {
  const hobbies = hobbiesByLocale(personalHobbies, templateLanguage);

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
