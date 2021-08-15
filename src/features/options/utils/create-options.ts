import { AppOptionsModel } from "../options-types";
import { createIdGenerator } from "../../../shared/utils/generate-id";

const defaultOptions: AppOptionsModel["options"] = {
  ui: {
    viewGridCols: 3,
  },
  schedule: {
    activeDay: "monday",
    trainingsCount: 0,
    exercisesCount: 1,
    setsCount: 3,
    exerciseName: "Exercise",
    reps: 0,
    weight: 0,
    spreadReps: true,
    spreadWeight: true,
  }
}

const createOptionsId = createIdGenerator({ prefix: "opts-" });
// ------------------------------------------------------------------------------
const createOptions = (): AppOptionsModel => {
  return {
    optionsId: createOptionsId(),
    options: defaultOptions,
  };
}

export { createOptions };