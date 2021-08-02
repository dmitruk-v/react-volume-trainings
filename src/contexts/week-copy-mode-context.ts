import React from "react";

type WeekCopyModeContextType = {
  fromWeekYear: string,
  fromWeekId: string,
  toWeekYear: string,
  toWeekId: string,
  isEnabled: boolean,
  setWeekCopyMode: (value: WeekCopyModeContextType) => void,
}

const now = new Date();
const currYear = now.getFullYear();

const weekCopyModeDefault: WeekCopyModeContextType = {
  fromWeekYear: currYear.toString(),
  fromWeekId: "",
  toWeekYear: currYear.toString(),
  toWeekId: "",
  isEnabled: false,
  setWeekCopyMode: value => { }
};

const WeekCopyModeContext = React.createContext(weekCopyModeDefault);
WeekCopyModeContext.displayName = "WeekCopyModeContext";

export { WeekCopyModeContext, weekCopyModeDefault }