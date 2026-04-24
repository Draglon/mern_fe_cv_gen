import { isEmpty, propOr } from "ramda";

type UserType = {
  avatarUrl: string;
  userName: string;
  firstName: string;
  lastName: string;
};

export const getProfileDefaultValues = (user: UserType) => ({
  avatarUrl: !isEmpty(user.avatarUrl) ? [user.avatarUrl] : [],
  userName: propOr("", "userName", user),
  firstName: propOr("", "firstName", user),
  lastName: propOr("", "lastName", user),
});
