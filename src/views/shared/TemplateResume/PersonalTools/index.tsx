"use client";
import { Locales } from "@/lib/constants/props/locales";
import { PersonalToolsProps } from "@/lib/constants/props/resume";
import { toolsByLocale } from "@/utils/personalTools";

import { Text } from "@/views/shared/antd/Typography";

type ToolItemProps = {
  tool: string;
  level: string | number;
  visible: boolean;
};

type ToolsProps = {
  templateLanguage: Locales;
  personalTools: PersonalToolsProps;
};

const PersonalTools = ({ templateLanguage, personalTools }: ToolsProps) => {
  const tools = toolsByLocale(personalTools, templateLanguage);

  return (
    <div className="personal-tools">
      {tools.map(
        ({ tool, level, visible }: ToolItemProps, index: number) =>
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
