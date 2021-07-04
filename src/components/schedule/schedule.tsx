import { WeekScheduleModel, calculateWeekStats, RootState } from "../../store";
import { useMemo } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

// ASSETS ------------------------------------------
// -------------------------------------------------

// STYLES ------------------------------------------
import "./schedule.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
import TrainingDay from "./training-day/training-day";
import Training from "./training/training";
import Exercise from "./exercise/exercise";
import ExSet from "./ex-set/ex-set";
import Stats from "./stats/stats";
import DaysMenu from "./days-menu/days-menu";
// -------------------------------------------------

type Props = {}

const Schedule: React.FC<Props> = (props) => {

  const weekSchedule = useSelector<RootState, WeekScheduleModel>(state => state.weekSchedule);
  const { path } = useRouteMatch();

  const weekStats = useMemo(
    () => calculateWeekStats(weekSchedule),
    [weekSchedule]
  );

  const scheduleDays = Object.keys(weekSchedule) as (keyof typeof weekSchedule)[];

  return (
    <div className="schedule">

      <div className="schedule__head">
        <div className="schedule__title-layout">
          <span className="schedule__title">Week stats</span>
        </div>
        <div className="schedule__stats">
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

      <div className="schedule__days">
        <DaysMenu schedule={weekSchedule} />
      </div>

      <div className="schedule__selected-day">
        <Route path={path} exact>
          Please select training day.
        </Route>

        {scheduleDays.map(day => (
          <Route key={day} path={`${path}/${day}`}>
            <TrainingDay initialTrainingDay={weekSchedule[day]}>
              {weekSchedule[day].trainings.map((training, tIdx) =>
                <div key={training.trainingId} className="training-day__training">
                  <Training
                    day={day}
                    initialTraining={training}
                    trainingNumber={tIdx + 1}
                  >
                    {training.exercises.map((exercise, eIdx) =>
                      <div key={exercise.exerciseId} className="training__exercise">
                        <Exercise
                          day={day}
                          trainingId={training.trainingId}
                          initialExercise={exercise}
                          exerciseNumber={eIdx + 1}
                        >
                          {exercise.sets.map((set, sIdx) =>
                            <div key={set.setId} className="exercise__ex-set">
                              <ExSet
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
      </div>

    </div>
  );
}

export default Schedule;