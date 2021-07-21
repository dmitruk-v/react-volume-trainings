import { UserModel } from "../store/types";
import { createIdGenerator } from "./generate-id";

const createUserId = createIdGenerator({ prefix: "usr-" });
// ------------------------------------------------------------------------------
const createUser = (username: string, password: string, email: string): UserModel => {
  return {
    userId: createUserId(),
    name: username,
    password: password,
    email: email,
    scheduleId: "",
    measurements: {}
  };
}

export { createUser };