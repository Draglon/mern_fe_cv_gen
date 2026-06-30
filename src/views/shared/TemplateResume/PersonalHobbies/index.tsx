"use client";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalHobbiesProps } from "@/lib/constants/props/resume";
import { HobbyType } from "@/lib/constants/props/resume/personalHobbies";
import { hobbiesByLocale } from "@/utils/personalHobbies";

import { Text } from "@/views/shared/antd/Typography";

type HobbiesProps = {
  templateLocale: Locales;
  personalHobbies: PersonalHobbiesProps;
};

const PersonalHobbies = ({ templateLocale, personalHobbies }: HobbiesProps) => {
  const hobbies = hobbiesByLocale(personalHobbies, templateLocale);

  return (
    <div className="personal-interests">
      <ul className="personal-interests__list">
        {hobbies.map(({ hobby }: HobbyType, index: number) => (
          <li className="personal-interests__item" key={index}>
            <Text className="personal-interests__text" strong>
              {hobby}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalHobbies;
