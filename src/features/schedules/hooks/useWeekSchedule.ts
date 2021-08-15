import { useMemo } from "react";
import { useAppSelector } from "../../../shared/hooks";
import { selectTrainingWeekById } from "../schedules-selectors";
import { TrainingWeekModel } from "../schedules-types"
import { calculateTrainingWeekStats } from "../utils";

const useWeekSchedule = (scheduleId: string, year: string, weekId: string) => {

  const trainingWeek = useAppSelector<TrainingWeekModel | undefined>(
    state => selectTrainingWeekById(state, scheduleId, year, weekId)
  );

  const weekStats = useMemo(() => calculateTrainingWeekStats(trainingWeek), [trainingWeek]);

  return {
    trainingWeek, weekStats
  }

}

export { useWeekSchedule }