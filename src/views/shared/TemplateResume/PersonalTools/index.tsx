"use client";
import { Locales, Locale } from "@/lib/constants/props/locales";
import { toolsByLocale } from "@/utils/personalTools";

import { Text } from "@/views/shared/antd/Typography";

type ToolItemProps = {
  tool: string;
  level: string | number;
  visible: boolean;
};

type PersonalToolsProps = {
  templateLanguage: Locales;
  personalTools: {
    tools: Locale;
  };
};

const PersonalTools = ({
  templateLanguage,
  personalTools,
}: PersonalToolsProps) => {
  const tools = toolsByLocale(personalTools, templateLanguage);

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
