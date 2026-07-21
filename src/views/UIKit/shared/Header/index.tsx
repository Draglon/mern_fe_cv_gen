"use client";
import clsx from "clsx";

import { Title } from "@/views/shared/antd/Typography";

type HeaderType = { title: string; className?: string };

const Header = ({ title, className }: HeaderType) => {
  return (
    <header className={clsx("mb-32", className)}>
      <Title className="page__title" level={3}>
        {title}
      </Title>
    </header>
  );
};

export default Header;
