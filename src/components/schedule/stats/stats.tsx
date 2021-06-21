import { StatsModel } from "../../../store";

// STYLES ------------------------------------------
import "./stats.css";
// -------------------------------------------------

type StatsOptions = {
  volumeTerm?: string,
  intensityTerm?: string,
  repsTerm?: string,
  volumeUnits?: string,
  intensityUnits?: string,
  repsUnits?: string,
  showVolumeUnits?: boolean,
  showIntensityUnits?: boolean,
  showRepsUnits?: boolean,
  modifierClasses?: string[]
}

const defaultStatsOptions = {
  volumeTerm: "Volume:",
  intensityTerm: "Intensity:",
  repsTerm: "Reps:",
  volumeUnits: "t",
  intensityUnits: "kg",
  repsUnits: "reps",
  showVolumeUnits: true,
  showIntensityUnits: true,
  showRepsUnits: true,
  modifierClasses: [""],
}

type Props = {
  statsOptions: StatsOptions,
  stats: StatsModel
}

const Stats: React.FC<Props> = (props) => {
  const opts = { ...defaultStatsOptions, ...props.statsOptions };
  return (
    <div className={`stats ${[...opts.modifierClasses]}`}>
      <div className="stats__item">
        <div className="stats-item stats-item--volume">
          <span className="stats-item__term">{opts.volumeTerm}</span>
          <span className="stats-item__value">{props.stats.volume.toFixed(2)}<span className="stats-item__units">{opts.volumeUnits}</span></span>
        </div>
      </div>
      <div className="stats__item">
        <div className="stats-item stats-item--intensity">
          <span className="stats-item__term">{opts.intensityTerm}</span>
          <span className="stats-item__value">{props.stats.intensity.toFixed(1)}<span className="stats-item__units">{opts.intensityUnits}</span></span>
        </div>
      </div>
      <div className="stats__item">
        <div className="stats-item stats-item--reps">
          <span className="stats-item__term">{opts.repsTerm}</span>
          <span className="stats-item__value">{props.stats.reps}<span className="stats-item__units">{opts.repsUnits}</span></span>
        </div>
      </div>
    </div>
  );
}

export default Stats;