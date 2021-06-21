// STYLES ------------------------------------------
import "./stats.css";
// -------------------------------------------------

type StatsOptions = {
  volumeTerm: string,
  intensityTerm: string,
  repsTerm: string,
  volumeUnits: string,
  intensityUnits: string,
  repsUnits: string,
  showVolumeUnits: boolean,
  showIntensityUnits: boolean,
  showRepsUnits: boolean,
  modifierClass: "" | "stats--week" | "stats--training" | "stats--exercise"
}

const defaultStatsOptions: StatsOptions = {
  volumeTerm: "Volume",
  intensityTerm: "Intensity",
  repsTerm: "Reps",
  volumeUnits: "t",
  intensityUnits: "kg",
  repsUnits: "reps",
  showVolumeUnits: true,
  showIntensityUnits: true,
  showRepsUnits: true,
  modifierClass: "",
}

type Props = {
  statsOptions: StatsOptions
}

const Stats: React.FC<Props> = (props) => {
  const opts = { ...defaultStatsOptions, ...props.statsOptions };
  return (
    <div>Stats</div>
  );
}

export default Stats;