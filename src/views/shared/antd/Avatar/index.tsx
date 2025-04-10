"use client";
import clsx from "clsx";
import { Avatar as AntdAvatar } from "antd";
import type { AvatarProps } from "antd";

const Avatar = ({ className, ...rest }: AvatarProps) => {
  return <AntdAvatar className={clsx("avatar", className)} {...rest} />;
};

export default Avatar;
