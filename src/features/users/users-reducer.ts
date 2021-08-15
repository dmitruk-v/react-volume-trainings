import { DataLoadingStatus } from "../../store";
import { UsersModel } from "./users-types";
import { UsersActions } from "./users-actions";
import { removeEntryByKey } from "../../store/utils/reducer-utils";

type UsersState = {
  status: DataLoadingStatus,
  error: string | null,
  data: UsersModel
}

const initialState: UsersState = {
  status: "idle",
  error: null,
  data: {}
}

const usersReducer = (oldState: UsersState = initialState, action: UsersActions): UsersState => {
  switch (action.type) {

    case "users/create":
      const { createdUser } = action.payload;
      return {
        ...oldState,
        status: "succeeded",
        data: {
          ...oldState.data,
          [createdUser.userId]: createdUser
        }
      }

    case "users/load":
      return {
        ...oldState,
        status: "loading",
        error: null,
      }

    case "users/loadSucceeded":
      return {
        ...oldState,
        status: "succeeded",
        error: null,
        data: action.payload.loadedUsers
      }

    case "users/loadFailed":
      return {
        ...oldState,
        status: "failed",
        error: action.payload.error,
      }

    case "users/remove":
      const { removedUser } = action.payload;
      return {
        ...oldState,
        data: removeEntryByKey(oldState.data, removedUser.userId)
      }

    default:
      return oldState;
  }
}

export type { UsersState };
export { usersReducer };