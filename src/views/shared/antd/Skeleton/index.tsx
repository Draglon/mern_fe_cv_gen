"use client";
import clsx from "clsx";
import { Skeleton as AntdSkeleton } from "antd";
import type { SkeletonProps } from "antd";

const Skeleton = ({ className, ...rest }: SkeletonProps) => {
  return <AntdSkeleton className={clsx("skeleton", className)} {...rest} />;
};

export default Skeleton;
