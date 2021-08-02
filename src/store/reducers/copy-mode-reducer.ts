import { Actions } from "../actions";

type CopyModeState = {
  fromWeekYear: string,
  fromWeekId: string,
  modeState: boolean
}

const initialState: CopyModeState = {
  fromWeekYear: `${new Date().getFullYear()}`,
  fromWeekId: "",
  modeState: false,
}

const copyModeReducer = (state: CopyModeState = initialState, action: Actions): CopyModeState => {
  switch (action.type) {

    case "copyMode/enable": {
      const { fromWeekYear, fromWeekId, modeState } = action.payload;
      return {
        ...state,
        fromWeekYear,
        fromWeekId,
        modeState
      }
    }

    case "copyMode/disable": {
      const { modeState } = action.payload;
      return {
        ...state,
        fromWeekYear: `${new Date().getFullYear()}`,
        fromWeekId: "",
        modeState
      }
    }

    default:
      return state;
  }
}

export { copyModeReducer }