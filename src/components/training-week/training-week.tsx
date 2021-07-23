import { calculateTrainingWeekStats, RootState } from "../../store";
import { TrainingWeekModel } from "../../store/types";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { getClasses } from "../../utils/css-utils";
import { selectTrainingWeekById } from "../../store/selectors";

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
// -------------------------------------------------

type Props = {}

type RouteParams = {
  scheduleId: string,
  year: string,
  weekId: string,
  day: string
}

const TrainingWeek: React.FC<Props> = (props) => {

  const match = useRouteMatch<RouteParams>();
  const trainingWeek = useSelector<RootState, TrainingWeekModel | undefined>(
    state => selectTrainingWeekById(state, match.params.scheduleId, match.params.year, match.params.weekId)
  );

  const weekStats = useMemo(
    () => calculateTrainingWeekStats(trainingWeek),
    [trainingWeek]
  );

  const weekScheduleClasses = getClasses({
    [`training-week--cycle_${trainingWeek?.cycle}`]: trainingWeek !== undefined
  });

  if (trainingWeek === undefined) {
    return (
      <div>Training week (scheduleId: {match.params.scheduleId}, Year: {match.params.year}, weekId: {match.params.weekId}) not found.</div>
    );
  }

  return (
    <div className={`training-week ${weekScheduleClasses}`}>
      <div className="training-week__head">
        <div className={`tweek-head tweek-head--cycle_${trainingWeek.cycle}`}>
          <div className="tweek-head__meta">
            <dl className="tweek-head__def tweek-head__date">
              <dt className="tweek-head__term">Date:</dt>
              <dd className="tweek-head__description">{JSON.stringify(trainingWeek.weekStartDate)}</dd>
            </dl>
            <dl className="tweek-head__def tweek-head__weekid">
              <dt className="tweek-head__term">WeekId:</dt>
              <dd className="tweek-head__description">{match.params.weekId}</dd>
            </dl>
            <dl className="tweek-head__def tweek-head__cycle">
              <dt className="tweek-head__term">Cycle:</dt>
              <dd className="tweek-head__description">{trainingWeek.cycle}</dd>
            </dl>
          </div>
          <div className="tweek-head__title">Week<br />stats</div>
          <div className="tweek-head__stats">
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

      <div className="training-week__days">
        <DaysMenu scheduleId={match.params.scheduleId} year={match.params.year} trainingWeek={trainingWeek} />
      </div>

      <div className="training-week__selected-day">
        <Switch>
          {(Object.keys(trainingWeek.days) as (keyof typeof trainingWeek.days)[]).map(day => (
            <Route key={day} path={`${match.path}/${day}`}>
              <TrainingDay
                scheduleId={match.params.scheduleId}
                year={match.params.year}
                weekId={match.params.weekId}
                initialTrainingDay={trainingWeek.days[day]}
              >
                {trainingWeek.days[day].trainings.map((training, tIdx) =>
                  <div key={training.trainingId} className="training-day__training">
                    <Training
                      scheduleId={match.params.scheduleId}
                      year={match.params.year}
                      weekId={trainingWeek.weekId}
                      day={day}
                      initialTraining={training}
                      trainingNumber={tIdx + 1}
                    >
                      {training.exercises.map((exercise, eIdx) =>
                        <div key={exercise.exerciseId} className="training__exercise">
                          <Exercise
                            scheduleId={match.params.scheduleId}
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
                                  scheduleId={match.params.scheduleId}
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
          <Redirect from={match.path} to={`${match.url}/tuesday`} />
        </Switch>
      </div>

    </div>
  );
}

export { TrainingWeek };