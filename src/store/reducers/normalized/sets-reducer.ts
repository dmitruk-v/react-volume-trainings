
type SetModel = {
  setId: string,
  reps: number,
  weight: number
}

type SetsState = {
  items: {
    [setId: string]: SetModel
  },
  ids: string[]
}

const initialState = {
  items: {},
  ids: []
}

const setsReducer = (state: SetsState = initialState, action: any): SetsState => {
  switch (action.type) {
    case "":
      return state;

    default:
      return state;
  }
}

export { setsReducer }