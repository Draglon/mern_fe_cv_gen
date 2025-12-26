"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { hobbiesByLocale } from "@/utils/personalHobbies";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalHobbies from "@/store/personalHobbies/operations/fetchPersonalHobbies";
import { personalHobbiesSelector } from "@/store/personalHobbies/selectors";

import { Text } from "@/views/shared/antd/Typography";

type HobbyProps = {
  hobby: string;
};

type HobbiesProps = {
  templateLanguage: string;
  personalHobbiesId: string;
};

const PersonalHobbies = ({
  personalHobbiesId,
  templateLanguage,
}: HobbiesProps) => {
  const dispatch = useAppDispatch();
  const personalHobbies = useAppSelector(personalHobbiesSelector);
  const hobbies = hobbiesByLocale(personalHobbies, templateLanguage as Locales);

  useEffect(() => {
    dispatch(fetchPersonalHobbies({ id: personalHobbiesId }));
  }, [dispatch, personalHobbiesId]);

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
