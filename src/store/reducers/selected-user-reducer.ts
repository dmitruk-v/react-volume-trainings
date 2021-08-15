import { UserModel } from "../../features/users/users-types";
import { Actions } from "../actions";

type SelectedUserState = UserModel | null;

const initialState = null;

const selectedUserReducer = (oldState: SelectedUserState = initialState, action: Actions): SelectedUserState => {
  switch (action.type) {
    case "selectedUser/activate":
      return action.payload.user;

    default:
      return oldState;
  }
}

export { selectedUserReducer };