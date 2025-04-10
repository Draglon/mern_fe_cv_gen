"use client";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useTranslations, useLocale } from "next-intl";

import { redirect } from "@/i18n/navigation";
import { homeRoute, profileRoute, settingsRoute } from "@/lib/routes";
import { useAppDispatch } from "@/store/hooks";
import { logout as logoutAction } from "@/store/auth/actions";
import Avatar from "@/views/shared/antd/Avatar";
import DropdownMenu from "@/views/shared/DropdownMenu";
import DropdownMenuItem from "@/views/shared/DropdownMenuItem";

const UserDropdownMenu = () => {
  const t = useTranslations("shared");
  const locale = useLocale();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    redirect({ href: homeRoute, locale });
  };

  return (
    <DropdownMenu
      icon={<Avatar size="large" icon={<UserOutlined />} />}
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
              href={""}
              iconLeft={<LogoutOutlined />}
              onClick={onLogout}
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
