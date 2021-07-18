import { Actions } from "../actions"
import { DataLoadingStatus } from "../state";

type UsersState = {
  status: DataLoadingStatus,
  error: string | null,
  data: {
    [userId: string]: {
      name: string,
      password: string,
      email: string
    }
  }
}

const initialState: UsersState = {
  status: "idle",
  error: null,
  data: {}
}

const usersReducer = (oldState: UsersState = initialState, action: Actions): UsersState => {
  switch (action.type) {
    default:
      return oldState;
  }
}

export type { UsersState };
export { usersReducer };