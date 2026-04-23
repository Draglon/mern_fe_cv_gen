import fetchAuth from "./fetchAuth";
import fetchRegister from "./fetchRegister";
import fetchUser from "./fetchUser";

import updateUserPassword from "./updateUserPassword";

const authOperations = [fetchAuth, fetchRegister, fetchUser, updateUserPassword];

export default authOperations;
