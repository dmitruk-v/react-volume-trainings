import { TrainingModel, Actions, Day } from "..";

type State = {
  day: Day,
  trainings: TrainingModel[]
};

const initialState: State = {
  day: "Monday",
  trainings: []
};

const trainingDayReducer = (trainingDay: State = initialState, action: Actions): State => {
  switch (action.type) {

    case "sets/add": {
      const { trainingId, exerciseId, addedSet } = action.payload;
      return {
        ...trainingDay,
        trainings: trainingDay.trainings.map(
          tr => tr.trainingId === trainingId
            ? {
              ...tr,
              exercises: tr.exercises.map(
                ex => ex.exerciseId === exerciseId
                  ? {
                    ...ex,
                    sets: [...ex.sets, addedSet]
                  } : ex
              )
            } : tr
        )
      }
    }

    case "sets/update": {
      const { trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...trainingDay,
        trainings: trainingDay.trainings.map(
          tr => tr.trainingId === trainingId
            ? {
              ...tr,
              exercises: tr.exercises.map(
                ex => ex.exerciseId === exerciseId
                  ? {
                    ...ex,
                    sets: ex.sets.map(
                      s => s.setId === updatedSet.setId ? updatedSet : s
                    )
                  } : ex
              )
            } : tr
        )
      };
    }

    case "exercises/add": {
      const { trainingId, addedExercise } = action.payload;
      return {
        ...trainingDay,
        trainings: trainingDay.trainings.map(
          tr => tr.trainingId === trainingId
            ? {
              ...tr,
              exercises: [...tr.exercises, addedExercise]
            } : tr
        )
      }
    }

    case "trainings/add": {
      const { addedTraining } = action.payload;
      return {
        ...trainingDay,
        trainings: [...trainingDay.trainings, addedTraining]
      };
    }

    default:
      return trainingDay;
  }
}

export { trainingDayReducer };