"use client";
import { ReactNode } from "react";
import { Steps as AntdSteps } from "antd";

type StepsProps = {
  steps: { title: string; content: ReactNode }[];
  current?: number;
  direction?: "horizontal" | "vertical";
};

const Steps = ({ steps, current, direction }: StepsProps) => {
  const items = steps.map((item, index) => ({ key: index, title: item.title }));

  return <AntdSteps current={current} items={items} direction={direction} />;
};

export default Steps;
