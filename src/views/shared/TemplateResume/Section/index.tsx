import clsx from "clsx";

import { Title, Text } from "@/views/shared/antd/Typography";

export type SectionProps = {
  children: React.ReactNode;
  title?: string;
  text?: string;
  className?: string;
  size?: string;
};

const Section = ({
  children,
  title,
  text = "",
  className,
  size = "middle",
}: SectionProps) => {
  return (
    <section className={clsx("section", className)} data-testid="section">
      {title && (
        <header className="section__header" data-testid="section-header">
          <Title className="section__title" level={size === "middle" ? 2 : 4}>
            {title}
          </Title>
          {text && (
            <Text className="section__text" type="secondary" italic>
              {text}
            </Text>
          )}
        </header>
      )}
      {children}
    </section>
  );
};

export default Section;
