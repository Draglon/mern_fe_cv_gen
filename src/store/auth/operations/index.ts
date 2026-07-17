import fetchAuth from "./fetchAuth";
import fetchRegister from "./fetchRegister";
import fetchUser from "./fetchUser";

import updateUserResume from "./updateUserResume";
import updateUserProfile from "./updateUserProfile";
import updateUserEmail from "./updateUserEmail";
import updateUserPassword from "./updateUserPassword";
import deleteAccount from "./deleteAccount";

const authOperations = [
  fetchAuth,
  fetchRegister,
  fetchUser,
  updateUserResume,
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
  deleteAccount,
];

export default authOperations;
