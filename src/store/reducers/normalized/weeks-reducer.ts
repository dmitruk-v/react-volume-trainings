
type DayModel = {
  day: string,
  date: Date,
  trainings: any[],
}

type WeekModel = {
  weekId: string,
  days: {
    "monday": DayModel,
    "tuesday": DayModel,
    "wednesday": DayModel,
    "thursday": DayModel,
    "friday": DayModel,
    "saturday": DayModel,
    "sunday": DayModel,
  },
  weekStartDate: Date,
}

type WeeksState = {
  items: {
    [weekId: string]: WeekModel
  },
  ids: string[]
}

const initialState: WeeksState = {
  items: {},
  ids: []
}

const weeksReducer = (state: WeeksState = initialState, action: any) => {
  switch (action.type) {
    case "":
      return state;

    default:
      return state;
  }
}

export { weeksReducer }