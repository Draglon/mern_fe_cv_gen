import { propOr } from "ramda";

import isPresent from "@/utils/isPresent";

type UserType = {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  userName: string;
};

export const getProfileDefaultValues = (user: UserType) => ({
  avatarUrl: isPresent(user.avatarUrl) ? [user.avatarUrl] : [],
  firstName: propOr("", "firstName", user),
  lastName: propOr("", "lastName", user),
  userName: propOr("", "userName", user),
});
