"use client";
import clsx from "clsx";

type BlockType = {
  className?: string;
  children: React.ReactNode;
};

const Block = ({ className, children }: BlockType) => {
  return <div className={clsx("page__block", className)}>{children}</div>;
};

export default Block;
