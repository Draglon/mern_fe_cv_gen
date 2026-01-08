import clsx from "clsx";

import { Title } from "@/views/shared/antd/Typography";

type Props = {
  children: React.ReactNode;
  title?: string | any;
  className?: string;
  size?: string;
};

const Section = ({ children, title, className, size = "middle" }: Props) => {
  return (
    <section className={clsx("section", className)}>
      {title && (
        <header className="section__header">
          <Title className="section__title" level={size === "middle" ? 2 : 4}>
            {title}
          </Title>
        </header>
      )}
      {children}
    </section>
  );
};

export default Section;
