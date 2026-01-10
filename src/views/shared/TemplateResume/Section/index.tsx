import clsx from "clsx";

import { Title, Text } from "@/views/shared/antd/Typography";

type Props = {
  children: React.ReactNode;
  title?: string | any;
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
}: Props) => {
  return (
    <section className={clsx("section", className)}>
      {title && (
        <header className="section__header">
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
