"use client";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalToolsProps } from "@/lib/constants/props/resume";
import { ToolType } from "@/lib/constants/props/resume/personalTools";
import { toolsByLocale } from "@/utils/personalTools";

import { Text } from "@/views/shared/antd/Typography";

type ToolsProps = {
  templateLocale: Locales;
  personalTools: PersonalToolsProps;
};

const PersonalTools = ({ templateLocale, personalTools }: ToolsProps) => {
  const tools = toolsByLocale(personalTools, templateLocale);

  return (
    <div className="personal-tools">
      {tools.map(
        ({ tool, level, visible }: ToolType, index: number) =>
          visible && (
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
          )
      )}
    </div>
  );
};

export default PersonalTools;
