"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { toolsByLocale } from "@/utils/personalTools";

import { Text } from "@/views/shared/antd/Typography";

type PersonalToolsProps = {
  personalTools: {
    tools: Locale;
  };
};

type ToolItemProps = {
  tool: string;
  level: string | number;
  visible: boolean;
};

const PersonalTools = ({ personalTools }: PersonalToolsProps) => {
  const locale = useLocale();
  const tools = toolsByLocale(personalTools, locale as Locales);

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
