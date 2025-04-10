"use client";
import { useLocale } from "next-intl";

import { Locale, Locales } from "@/lib/constants/props/locales";
import { Text } from "@/views/shared/antd/Typography";

const PERSONAL_TOOLS = [
  {
    label: "VS Code, Cursor",
    progress: "100%",
  },
  {
    label: "npm, yarn, git",
    progress: "100%",
  },
  {
    label: "Webpack",
    progress: "100%",
  },
  {
    label: "Insomnia, Postman, MongoDB Compass",
    progress: "100%",
  },
  {
    label: "Figma, InVision, Photoshop",
    progress: "100%",
  },
  {
    label: "Jira, Trello",
    progress: "75%",
  },
  {
    label: "Linux, Windows, MacOS",
    progress: "100%",
  },
];

type PersonalToolsProps = {
  personalTools: {
    tools: Locale;
  };
};

const PersonalTools = ({ personalTools }: PersonalToolsProps) => {
  const locale = useLocale();
  const toolsByLocale = JSON.parse(
    personalTools?.tools[locale as Locales] || "[]"
  );

  console.log("toolsByLocale: ", toolsByLocale);

  return (
    <div className="personal-tools">
      {PERSONAL_TOOLS.map((tool, index) => (
        <div className="personal-tools__item" key={index}>
          <Text className="personal-tools__label" strong>
            {tool.label}
          </Text>
          <div className="personal-tools__progress">
            <div
              className="personal-tools__progress-value"
              style={{ width: tool.progress }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalTools;
