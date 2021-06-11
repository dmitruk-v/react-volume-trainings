import "./schedule.css";
import { WeekScheduleModel, calculateWeekStats } from "../../store";
import { useMemo } from "react";
import TrainingDay from "../training-day/training-day";

type Props = {
  initialSchedule: WeekScheduleModel
}

const Schedule: React.FC<Props> = (props) => {

  console.log("Schedule called", props);

  const weekStats = useMemo(
    () => calculateWeekStats(props.initialSchedule),
    [props.initialSchedule]
  );

  return (
    <div className="schedule">
      <div className="schedule__stats">
        <div className="stats">
          <div className="stats__item">
            <div className="stats-item stats-item--volume">
              <div className="stats-item__term">Volume</div>
              <div className="stats-item__value">{weekStats.volume.toFixed(2)} <span className="stats-item__units">t</span></div>
            </div>
          </div>
          <div className="stats__item">
            <div className="stats-item stats-item--intensity">
              <div className="stats-item__term">Intensity</div>
              <div className="stats-item__value">{weekStats.intensity.toFixed(1)} <span className="stats-item__units">kg</span></div>
            </div>
          </div>
          <div className="stats__item">
            <div className="stats-item stats-item--reps">
              <div className="stats-item__term">Reps</div>
              <div className="stats-item__value">{weekStats.reps} <span className="stats-item__units">reps</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="schedule__days">
        {Object.values(props.initialSchedule).map(trainingDay => {
          return (
            <TrainingDay
              key={trainingDay.day}
              initialTrainingDay={trainingDay}
            />
          )
        })}
      </div>
    </div>
  );
}

export default Schedule;