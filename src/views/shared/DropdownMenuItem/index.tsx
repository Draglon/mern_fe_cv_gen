import clsx from "clsx";
import { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import Button from "@/views/shared/antd/Button";
import DropdownMenuItemContent from "./Content";

export type DropdownMenuItemProps = {
  id?: string;
  href?: string;
  target?: string;
  isLink?: boolean;
  isNextLink?: boolean;
  itemClassNames?: string;
  itemTextClassNames?: string;
  legacyBehavior?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const DropdownMenuItem = ({
  id,
  href,
  isLink,
  isNextLink,
  target,
  itemClassNames,
  itemTextClassNames,
  legacyBehavior,
  iconLeft,
  iconRight,
  children,
  disabled,
  onClick,
  ...restProps
}: DropdownMenuItemProps) => {
  if (isNextLink && href) {
    return (
      <Link
        href={href}
        target={target}
        legacyBehavior={legacyBehavior}
        data-testid="next-link"
      >
        <Button
          id={id}
          className={clsx("dropdown__item", itemClassNames)}
          role="button"
          type="link"
          color="default"
          data-testid="next-link-button"
          {...restProps}
        >
          <DropdownMenuItemContent
            itemTextClassNames={itemTextClassNames}
            iconLeft={iconLeft}
            iconRight={iconRight}
          >
            {children}
          </DropdownMenuItemContent>
        </Button>
      </Link>
    );
  }

  if (isLink && href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        className={clsx("dropdown__item", itemClassNames)}
        data-testid="link"
        {...restProps}
      >
        <DropdownMenuItemContent
          itemTextClassNames={itemTextClassNames}
          iconLeft={iconLeft}
          iconRight={iconRight}
        >
          {children}
        </DropdownMenuItemContent>
      </a>
    );
  }

  return (
    <Button
      id={id}
      className={clsx("dropdown__item", itemClassNames)}
      role="button"
      type="text"
      color="default"
      disabled={disabled}
      onClick={onClick}
      data-testid="button"
      {...restProps}
    >
      <DropdownMenuItemContent
        itemTextClassNames={itemTextClassNames}
        iconLeft={iconLeft}
        iconRight={iconRight}
      >
        {children}
      </DropdownMenuItemContent>
    </Button>
  );
};

export default DropdownMenuItem;
