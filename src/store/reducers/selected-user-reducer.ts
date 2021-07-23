import { Actions } from "../actions";

type SelectedUserState = string;

const initialState = "";

const selectedUserReducer = (oldState: SelectedUserState = initialState, action: Actions): SelectedUserState => {
  switch (action.type) {
    case "selectedUser/activate":
      return action.payload.userId;

    default:
      return oldState;
  }
}

export { selectedUserReducer };