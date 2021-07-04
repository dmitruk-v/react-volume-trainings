import { TrainingDayModel } from "..";

const updateTrainingDayAction = (updatedDay: TrainingDayModel) => {
  return {
    type: "schedule/trainingDay/update",
    payload: { updatedDay }
  } as const
}

type TrainingDayActions = ReturnType<typeof updateTrainingDayAction>;

export type { TrainingDayActions };
export { updateTrainingDayAction };