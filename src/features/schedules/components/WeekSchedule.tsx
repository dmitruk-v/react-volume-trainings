import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { getClasses } from "../../../shared/utils/css-utils";
import { useWeekSchedule } from "../hooks/useWeekSchedule";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./WeekSchedule.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { WeekScheduleDay } from "./WeekScheduleDay";
import { WeekScheduleTraining } from "./WeekScheduleTraining";
import { WeekScheduleExercise } from "./WeekScheduleExercise";
import { Stats } from "./Stats";
import { WeekScheduleMenu } from "./WeekScheduleMenu";
import { WeekScheduleSet } from "./WeekScheduleSet";
// -------------------------------------------------

type RouteParams = {
  scheduleId: string,
  year: string,
  weekId: string,
  day: string
}

type Props = {}

const WeekSchedule = (props: Props) => {

  const { path, params } = useRouteMatch<RouteParams>();
  const { trainingWeek, weekStats } = useWeekSchedule(params.scheduleId, params.year, params.weekId);

  if (trainingWeek === undefined) {
    return (
      <div>Training week (scheduleId: {params.scheduleId}, Year: {params.year}, weekId: {params.weekId}) not found.</div>
    );
  }

  const weekScheduleClasses = getClasses({
    [`week-schedule--cycle_${trainingWeek?.cycle}`]: trainingWeek !== undefined
  });
  const trainingDays = (Object.keys(trainingWeek.days) as (keyof typeof trainingWeek.days)[]);

  return (
    <div className={`week-schedule ${weekScheduleClasses}`}>
      <div className="week-schedule__head">
        <div className={`wsch-head wsch-head--cycle_${trainingWeek.cycle}`}>
          <div className="wsch-head__meta">
            <dl className="wsch-head__def wsch-head__date">
              <dt className="wsch-head__term">Date:</dt>
              <dd className="wsch-head__description">{JSON.stringify(trainingWeek.weekStartDate)}</dd>
            </dl>
            <dl className="wsch-head__def wsch-head__weekid">
              <dt className="wsch-head__term">WeekId:</dt>
              <dd className="wsch-head__description">{params.weekId}</dd>
            </dl>
            <dl className="wsch-head__def wsch-head__cycle">
              <dt className="wsch-head__term">Cycle:</dt>
              <dd className="wsch-head__description">{trainingWeek.cycle}</dd>
            </dl>
          </div>
          <div className="wsch-head__title">Week<br />stats</div>
          <div className="wsch-head__stats">
            <Stats
              statsOptions={{
                modifierClasses: [
                  "stats--week",
                  "stats--colored-terms",
                  "stats--colored-values"
                ],
                repsUnits: "",
              }}
              stats={weekStats}
            />
          </div>
        </div>
      </div>

      <div className="week-schedule__days-menu">
        <WeekScheduleMenu
          scheduleId={params.scheduleId}
          year={params.year}
          trainingWeek={trainingWeek}
        />
      </div>

      <div className="week-schedule__selected-day">
        <Switch>
          {trainingDays.map(day => (
            <Route exact key={day} path={`${path}/${day}`}>
              <WeekScheduleDay
                scheduleId={params.scheduleId}
                year={params.year}
                weekId={params.weekId}
                initialTrainingDay={trainingWeek.days[day]}
              >
                {trainingWeek.days[day].trainings.map((training, tIdx) =>
                  <div key={training.trainingId} className="wsch-day__training">
                    <WeekScheduleTraining
                      scheduleId={params.scheduleId}
                      year={params.year}
                      weekId={trainingWeek.weekId}
                      day={day}
                      initialTraining={training}
                      trainingNumber={tIdx + 1}
                    >
                      {training.exercises.map((exercise, eIdx) =>
                        <div key={exercise.exerciseId} className="wsch-training__exercise">
                          <WeekScheduleExercise
                            scheduleId={params.scheduleId}
                            year={params.year}
                            weekId={trainingWeek.weekId}
                            day={day}
                            trainingId={training.trainingId}
                            initialExercise={exercise}
                            exerciseNumber={eIdx + 1}
                          >
                            {exercise.sets.map((set, sIdx) =>
                              <div key={set.setId} className="wsch-exercise__set">
                                <WeekScheduleSet
                                  scheduleId={params.scheduleId}
                                  year={params.year}
                                  weekId={trainingWeek.weekId}
                                  day={day}
                                  trainingId={training.trainingId}
                                  exerciseId={exercise.exerciseId}
                                  initialSet={set}
                                  setNumber={sIdx + 1}
                                />
                              </div>
                            )}
                          </WeekScheduleExercise>
                        </div>
                      )}
                    </WeekScheduleTraining>
                  </div>
                )}
              </WeekScheduleDay>
            </Route>
          ))}
          <Redirect to={`${path}/tuesday`} />
        </Switch>
      </div>

    </div>
  );
}

export { WeekSchedule };