"use client";
import { ReactNode } from "react";
import { Steps as AntdSteps } from "antd";

type StepsProps = {
  steps: { title: string; content: ReactNode }[];
  current?: number;
  orientation?: "horizontal" | "vertical";
};

const Steps = ({ steps, current, orientation }: StepsProps) => {
  const items = steps.map((item, index) => ({ key: index, title: item.title }));

  return (
    <AntdSteps current={current} items={items} orientation={orientation} />
  );
};

export default Steps;
