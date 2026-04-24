import fetchAuth from "./fetchAuth";
import fetchRegister from "./fetchRegister";
import fetchUser from "./fetchUser";

import updateUserProfile from "./updateUserProfile";
import updateUserEmail from "./updateUserEmail";
import updateUserPassword from "./updateUserPassword";

const authOperations = [
  fetchAuth,
  fetchRegister,
  fetchUser,
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
];

export default authOperations;
