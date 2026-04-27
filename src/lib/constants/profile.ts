import { propOr } from "ramda";

import isPresent from "@/utils/isPresent";

type UserType = {
  avatarUrl?: string;
  userName: string;
  firstName: string;
  lastName: string;
};

export const getProfileDefaultValues = (user: UserType) => ({
  avatarUrl: isPresent(user.avatarUrl) ? [user.avatarUrl] : [],
  userName: propOr("", "userName", user),
  firstName: propOr("", "firstName", user),
  lastName: propOr("", "lastName", user),
});
