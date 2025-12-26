"use client";
import { useEffect } from "react";

import { Locales } from "@/lib/constants/props/locales";
import { toolsByLocale } from "@/utils/personalTools";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import fetchPersonalTools from "@/store/personalTools/operations/fetchPersonalTools";
import { personalToolsSelector } from "@/store/personalTools/selectors";

import { Text } from "@/views/shared/antd/Typography";

type PersonalToolsProps = {
  templateLanguage: string;
  personalToolsId: string;
};

type ToolItemProps = {
  tool: string;
  level: string | number;
  visible: boolean;
};

const PersonalTools = ({
  personalToolsId,
  templateLanguage,
}: PersonalToolsProps) => {
  const dispatch = useAppDispatch();
  const personalTools = useAppSelector(personalToolsSelector);
  const tools = toolsByLocale(personalTools, templateLanguage as Locales);

  useEffect(() => {
    dispatch(fetchPersonalTools({ id: personalToolsId }));
  }, [dispatch, personalToolsId]);

  return (
    <div className="personal-tools">
      {tools.map(({ tool, level, visible }: ToolItemProps, index: number) =>
        visible ? (
          <div className="personal-tools__item" key={index}>
            <Text className="personal-tools__label" strong>
              {tool}
            </Text>
            <div className="personal-tools__progress">
              <div
                className="personal-tools__progress-value"
                style={{ width: `${level}%` }}
              />
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default PersonalTools;
