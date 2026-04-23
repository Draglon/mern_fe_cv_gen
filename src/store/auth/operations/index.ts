import fetchAuth from "./fetchAuth";
import fetchRegister from "./fetchRegister";
import fetchUser from "./fetchUser";

import updateUserEmail from "./updateUserEmail";
import updateUserPassword from "./updateUserPassword";

const authOperations = [
  fetchAuth,
  fetchRegister,
  fetchUser,
  updateUserEmail,
  updateUserPassword,
];

export default authOperations;
