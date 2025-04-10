import React, { ReactNode } from "react";
import { LinkProps } from "next/link";
import clsx from "clsx";

import { Link } from "@/i18n/navigation";
import Button from "@/views/shared/antd/Button";
import DropdownMenuItemContent from "./Content";

type DropdownMenuItemProps = {
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
  ...restProps
}: DropdownMenuItemProps & LinkProps) => {
  if (isNextLink) {
    return (
      <Link href={href} target={target} legacyBehavior={legacyBehavior}>
        <Button
          id={id}
          className={clsx("dropdown__item", itemClassNames)}
          role="button"
          type="link"
          color="default"
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

  if (isLink) {
    <a
      id={id}
      href={href}
      target={target}
      className={clsx("dropdown__item", itemClassNames)}
      {...restProps}
    >
      <DropdownMenuItemContent
        itemTextClassNames={itemTextClassNames}
        iconLeft={iconLeft}
        iconRight={iconRight}
      >
        {children}
      </DropdownMenuItemContent>
    </a>;
  }

  return (
    <Button
      id={id}
      className={clsx("dropdown__item", itemClassNames)}
      role="button"
      type="text"
      color="default"
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
