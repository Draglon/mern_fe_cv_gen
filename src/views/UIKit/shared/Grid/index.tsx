"use client";
import clsx from "clsx";

type GridType = {
  className?: string;
  children: React.ReactNode;
};

const Grid = ({ className, children }: GridType) => {
  return <div className={clsx("d-grid gap-16", className)}>{children}</div>;
};

export default Grid;
