"use client";
import isPresent from "@/utils/isPresent";
import profileInitials from "@/utils/profileInitials";
import { useAppSelector } from "@/store/hooks";
import { userSelector } from "@/store/auth/selectors";

import Avatar from "@/views/shared/antd/Avatar";

type UserType = {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  userName: string;
};

const DropdownMenuIcon = () => {
  const user = useAppSelector(userSelector) as UserType;

  if (isPresent(user?.avatarUrl))
    return <Avatar size="large" src={user.avatarUrl} alt="Avatar" />;

  return <Avatar size="large">{profileInitials(user)}</Avatar>;
};

export default DropdownMenuIcon;
