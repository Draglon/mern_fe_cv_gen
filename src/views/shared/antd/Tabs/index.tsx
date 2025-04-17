"use client";
import clsx from "clsx";
import React from "react";
import { Tabs as AntdTabs } from "antd";
import type { TabsProps } from "antd";

const Tabs = ({ className, ...rest }: TabsProps) => {
  return <AntdTabs className={clsx("tabs", className)} {...rest} />;
};

export default Tabs;
