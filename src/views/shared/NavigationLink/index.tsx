"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import { LinkProps } from "next/link";

import { Link, usePathname } from "@/i18n/navigation";

const NavigationLink = ({
  href,
  children,
  className,
  ...rest
}: LinkProps & { children: ReactNode; className?: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    // @ts-ignore
    <Link
      aria-current={isActive ? "page" : undefined}
      className={clsx(className, isActive && "active")}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
