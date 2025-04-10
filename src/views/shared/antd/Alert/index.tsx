"use client";
import clsx from "clsx";
import { Alert as AntdAlert } from "antd";
import type { AlertProps } from "antd";

import { ALERT_KINDS } from "@/lib/constants/alert";

const Alert = ({ className, type, ...rest }: AlertProps) => {
  const alertClassNames = clsx("alert", className, {
    "alert--error": type === ALERT_KINDS.error,
    "alert--success": type === ALERT_KINDS.success,
    "alert--warning": type === ALERT_KINDS.warning,
    "alert--info": type === ALERT_KINDS.info,
  });

  return <AntdAlert className={alertClassNames} {...rest} />;
};

export default Alert;
