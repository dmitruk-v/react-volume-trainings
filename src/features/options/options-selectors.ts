import { RootState } from "../../store";
import { AppOptionsModel } from "./options-types";

const selectAllOptions = (state: RootState): { [optionsId: string]: AppOptionsModel } => {
  return state.options.data;
}

const selectOptionsById = (state: RootState, optionsId: string): AppOptionsModel | undefined => {
  return state.options.data[optionsId];
}

// const selectOptionsByUserId = (state: RootState, userId: string): AppOptionsModel | undefined => {
//   const selectedUser = selectUserById(state, userId);
//   if (selectedUser === undefined) return;
//   return state.options.data[selectedUser.optionsId];
// }

export { selectAllOptions, selectOptionsById, }