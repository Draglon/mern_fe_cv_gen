import React, { ReactNode } from "react";
import clsx from "clsx";

type DropdownMenuItemProps = {
  itemTextClassNames?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
};

const DropdownMenuItemContent = ({
  itemTextClassNames,
  iconLeft,
  iconRight,
  children,
}: DropdownMenuItemProps) => {
  return (
    <>
      {iconLeft && <span className="dropdown__icon-left">{iconLeft}</span>}
      <span className={clsx("dropdown__text", itemTextClassNames)}>
        {children}
      </span>
      {iconRight && <span className="dropdown__icon-right">{iconRight}</span>}
    </>
  );
};

export default DropdownMenuItemContent;
