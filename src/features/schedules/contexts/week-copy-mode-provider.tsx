import React, { PropsWithChildren, useMemo, useState } from "react";
import { useOnEscape } from "../../../shared/hooks";

const now = new Date();
const currYear = now.getFullYear();
const weekCopyModeDefault = {
  scheduleId: "",
  fromWeekYear: currYear.toString(),
  fromWeekId: "",
  toWeekYear: currYear.toString(),
  toWeekId: "",
  isEnabled: false,
  setFromAndEnable: (fromWeekYear: string, fromWeekId: string) => { },
  setToAndDisable: (toWeekYear: string, toWeekId: string) => { },
  setDefaultsAndDisable: () => { }
};

const WeekCopyModeContext = React.createContext(weekCopyModeDefault);
WeekCopyModeContext.displayName = "WeekCopyModeContext";


// CONTEXT PROVIDER COMPONENT
// --------------------------------------------------------------------------
type Props = {
  scheduleId: string
};

const WeekCopyModeProvider = (props: PropsWithChildren<Props>) => {
  const [weekCopyMode, setWeekCopyMode] = useState(weekCopyModeDefault);

  const value = useMemo(() => ({
    ...weekCopyMode,
    scheduleId: props.scheduleId,
    setFromAndEnable(fromWeekYear: string, fromWeekId: string) {
      setWeekCopyMode({ ...weekCopyMode, fromWeekYear, fromWeekId, isEnabled: true });
    },
    setToAndDisable(toWeekYear: string, toWeekId: string) {
      setWeekCopyMode({ ...weekCopyMode, toWeekYear, toWeekId, isEnabled: false });
    },
    setDefaultsAndDisable() {
      setWeekCopyMode({ ...weekCopyModeDefault });
    }
  }), [weekCopyMode, props.scheduleId]);

  useOnEscape(value.setDefaultsAndDisable);

  return <WeekCopyModeContext.Provider value={value}>{props.children}</WeekCopyModeContext.Provider>;
}
// --------------------------------------------------------------------------


// CONTEXT CONSUMER HOOK
// --------------------------------------------------------------------------
const useWeekCopyModeContext = () => {
  return React.useContext(WeekCopyModeContext);
}
// --------------------------------------------------------------------------

export { WeekCopyModeProvider, weekCopyModeDefault, useWeekCopyModeContext }