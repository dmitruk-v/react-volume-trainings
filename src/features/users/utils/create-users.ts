import { UserModel } from "../users-types";
import { createIdGenerator } from "../../../shared/utils/generate-id";

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