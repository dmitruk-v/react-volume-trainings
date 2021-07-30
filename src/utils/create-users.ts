import { UserModel } from "../store/types";
import { createIdGenerator } from "./generate-id";

const createUserId = createIdGenerator({ prefix: "usr-" });
// ------------------------------------------------------------------------------
const createUser = (username: string, scheduleId: string, optionsId: string): UserModel => {
  return {
    userId: createUserId(),
    name: username,
    scheduleId: scheduleId,
    optionsId: optionsId,
    measurements: {}
  };
}

export { createUser };