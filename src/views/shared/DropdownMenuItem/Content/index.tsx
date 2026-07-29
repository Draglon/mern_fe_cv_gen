import clsx from "clsx";
import { ReactNode } from "react";

type DropdownMenuItemProps = {
  itemTextClassNames?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
};

const DropdownMenuItemContent = ({
  itemTextClassNames,
  iconLeft,
  iconRight,
  children,
}: DropdownMenuItemProps) => {
  return (
    <>
      {iconLeft && (
        <span className="dropdown__icon-left" data-testid="dropdown-icon-left">
          {iconLeft}
        </span>
      )}
      <span
        className={clsx("dropdown__text", itemTextClassNames)}
        data-testid="dropdown-text"
      >
        {children}
      </span>
      {iconRight && (
        <span
          className="dropdown__icon-right"
          data-testid="dropdown-icon-right"
        >
          {iconRight}
        </span>
      )}
    </>
  );
};

export default DropdownMenuItemContent;
