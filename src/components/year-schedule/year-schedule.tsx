import { useMemo } from "react";
import { getCurrentWeekStartDate } from "../../utils/date-utils";
import { RootState } from "../../store";
import { YearScheduleModel } from "../../store/types";
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./year-schedule.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { YearWeek } from "../year-week/year-week";
// -------------------------------------------------

type Props = {};
type RouteParams = {
  year: string
}

const YearSchedule: React.FC<Props> = (props) => {

  const currYear = new Date().getFullYear();
  const currWeekStartDate = useMemo(() => getCurrentWeekStartDate(), []);
  const yearSchedule = useSelector<RootState, YearScheduleModel>(state => state.yearSchedule);
  const match = useRouteMatch<RouteParams>();

  console.log("YearSchedule called", match, props);

  return (
    <div className="year-schedule">

      <div className="year-schedule__year-selector">
        {Object.keys(yearSchedule).map(year => (
          <NavLink
            key={year}
            to={`${match.url}/${year}`}
            className="year-schedule__button ysch-button"
            activeClassName="ysch-button--active"
          >{year}</NavLink>
        ))}
      </div>

      <Switch>
        {Object.keys(yearSchedule).map(year => (
          <Route key={year} path={`${match.path}/${year}`}>
            <div className="year-schedule__weeks">
              {yearSchedule[year].map((week, idx) => (
                <div key={idx} className="year-schedule__week">
                  <YearWeek
                    year={year}
                    weekNum={idx + 1}
                    trainingWeek={week}
                    currWeekStartDate={currWeekStartDate}
                  />
                </div>
              ))}
            </div>
          </Route>
        ))}
        <Redirect exact from={match.path} to={`${match.url}/${currYear}`} />
      </Switch>

    </div>
  );
}

export { YearSchedule };