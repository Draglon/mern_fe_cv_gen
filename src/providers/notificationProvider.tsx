"use client";
import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { createContext, useContext } from "react";

const NotificationContext = createContext<NotificationInstance | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }

  return context;
};

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
