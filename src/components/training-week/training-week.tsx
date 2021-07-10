import { calculateTrainingWeekStats, RootState } from "../../store";
import { TrainingWeekModel } from "../../store/types";
import { useMemo } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./training-week.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import { TrainingDay } from "../training-day/training-day";
import { Training } from "../training/training";
import { Exercise } from "../exercise/exercise";
import { ExSet } from "../ex-set/ex-set";
import { Stats } from "../stats/stats";
import { DaysMenu } from "../days-menu/days-menu";
import { getClasses } from "../../utils/css-utils";
// -------------------------------------------------

type Props = {}

type RouteParams = {
  year: string,
  weekId: string,
  day: string
}

const TrainingWeek: React.FC<Props> = (props) => {

  const match = useRouteMatch<RouteParams>();
  const trainingWeek = useSelector<RootState, TrainingWeekModel | undefined>(
    state => state.yearSchedule[match.params.year].find(week => week.weekId === match.params.weekId)
  );

  const weekStats = useMemo(
    () => calculateTrainingWeekStats(trainingWeek),
    [trainingWeek]
  );

  const weekScheduleClasses = getClasses({
    [`week-schedule--cycle_${trainingWeek?.cycle}`]: trainingWeek !== undefined
  });

  if (trainingWeek === undefined) {
    return (
      <div>Can't find training week. Year: {match.params.year}, weekId: {match.params.weekId}</div>
    );
  }

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
              <dd className="wsch-head__description">{match.params.weekId}</dd>
            </dl>
            <dl className="wsch-head__def wsch-head__cycle">
              <dt className="wsch-head__term">Cycle:</dt>
              <dd className="wsch-head__description">{trainingWeek.cycle}</dd>
            </dl>
          </div>
          <div className="wsch-head__title">Week<br/>stats</div>
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

      <div className="week-schedule__days">
        <DaysMenu year={match.params.year} trainingWeek={trainingWeek} />
      </div>

      <div className="week-schedule__selected-day">
        <Switch>
          {(Object.keys(trainingWeek.days) as (keyof typeof trainingWeek.days)[]).map(day => (
            <Route key={day} path={`${match.path}/${day}`}>
              <TrainingDay initialTrainingDay={trainingWeek.days[day]}>
                {trainingWeek.days[day].trainings.map((training, tIdx) =>
                  <div key={training.trainingId} className="training-day__training">
                    <Training
                      year={match.params.year}
                      weekId={trainingWeek.weekId}
                      day={day}
                      initialTraining={training}
                      trainingNumber={tIdx + 1}
                    >
                      {training.exercises.map((exercise, eIdx) =>
                        <div key={exercise.exerciseId} className="training__exercise">
                          <Exercise
                            year={match.params.year}
                            weekId={trainingWeek.weekId}
                            day={day}
                            trainingId={training.trainingId}
                            initialExercise={exercise}
                            exerciseNumber={eIdx + 1}
                          >
                            {exercise.sets.map((set, sIdx) =>
                              <div key={set.setId} className="exercise__ex-set">
                                <ExSet
                                  year={match.params.year}
                                  weekId={trainingWeek.weekId}
                                  day={day}
                                  trainingId={training.trainingId}
                                  exerciseId={exercise.exerciseId}
                                  initialSet={set}
                                  setNumber={sIdx + 1}
                                />
                              </div>
                            )}
                          </Exercise>
                        </div>
                      )}
                    </Training>
                  </div>
                )}
              </TrainingDay>
            </Route>
          ))}
          <Redirect from={match.path} to={`${match.url}/friday`} />
        </Switch>
      </div>

    </div>
  );
}

export { TrainingWeek };