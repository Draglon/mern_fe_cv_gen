"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { useRouter } from "@/i18n/navigation";
import { homeRoute, profileRoute, settingsRoute } from "@/lib/routes";
import clearAuthSession from "@/utils/clearAuthSession";
import { useAppDispatch } from "@/store/hooks";

import DropdownMenu from "@/views/shared/DropdownMenu";
import DropdownMenuIcon from "@/views/shared/DropdownMenuIcon";
import DropdownMenuItem from "@/views/shared/DropdownMenuItem";

const UserDropdownMenu = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations("shared");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onLogout = async () => {
    if (isLoading) return;

    setLoading(true);
    try {
      await clearAuthSession(dispatch);
      router.push(homeRoute);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu
      icon={<DropdownMenuIcon />}
      items={[
        {
          key: "1",
          label: (
            <DropdownMenuItem
              href={profileRoute}
              iconLeft={<UserOutlined />}
              isNextLink
            >
              {t("profile")}
            </DropdownMenuItem>
          ),
        },
        {
          key: "2",
          label: (
            <DropdownMenuItem
              href={settingsRoute}
              iconLeft={<SettingOutlined />}
              isNextLink
            >
              {t("settings")}
            </DropdownMenuItem>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: (
            <DropdownMenuItem
              iconLeft={<LogoutOutlined />}
              onClick={onLogout}
              disabled={isLoading}
            >
              {t("logout")}
            </DropdownMenuItem>
          ),
        },
      ]}
      shouldStopPropagation
    />
  );
};

export default UserDropdownMenu;
