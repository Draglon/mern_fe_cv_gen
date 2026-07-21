"use client";

type GridItemType = {
  className?: string;
  children: React.ReactNode;
};

const GridItem = ({ className, children }: GridItemType) => {
  return <div className={className}>{children}</div>;
};

export default GridItem;
