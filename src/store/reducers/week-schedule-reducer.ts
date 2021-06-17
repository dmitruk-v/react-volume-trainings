import { Actions, WeekScheduleModel, ExSetModel } from "..";

const initialState: WeekScheduleModel = {
  Monday: { day: "Monday", trainings: [] },
  Tuesday: { day: "Tuesday", trainings: [] },
  Wednesday: { day: "Wednesday", trainings: [] },
  Thursday: { day: "Thursday", trainings: [] },
  Friday: { day: "Friday", trainings: [] },
  Saturday: { day: "Saturday", trainings: [] },
  Sunday: { day: "Sunday", trainings: [] }
}

const weekScheduleReducer = (weekSchedule: WeekScheduleModel = initialState, action: Actions) => {
  console.log("inside weekScheduleReducer", action);

  switch (action.type) {
    case "schedule/load":
      return action.payload.schedule;

    case "sets/add": {
      const { day, trainingId, exerciseId, addedSet } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.map(
            tr => tr.trainingId === trainingId
              ? {
                ...tr,
                exercises: tr.exercises.map(
                  ex => ex.exerciseId === exerciseId
                    ? {
                      ...ex,
                      sets: [...ex.sets, addedSet]
                    }
                    : ex
                )
              }
              : tr
          )
        }
      }
    }

    case "sets/update": {
      const { day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.map(
            tr => tr.trainingId === trainingId
              ? {
                ...tr,
                exercises: tr.exercises.map(
                  ex => ex.exerciseId === exerciseId
                    ? {
                      ...ex,
                      sets: ex.sets.map(
                        s => s.setId === updatedSet.setId
                          ? updatedSet
                          : s
                      )
                    }
                    : ex
                )
              }
              : tr
          )
        }
      }
    }

    case "sets/updateSpread": {
      const { day, trainingId, exerciseId, updatedSet } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.map(
            tr => tr.trainingId === trainingId
              ? {
                ...tr,
                exercises: tr.exercises.map(
                  ex => ex.exerciseId === exerciseId
                    ? {
                      ...ex,
                      sets: spreadSet(ex.sets, updatedSet)
                    }
                    : ex
                )
              }
              : tr
          )
        }
      }
    }

    case "trainings/add": {
      const { day, addedTraining } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: [...weekSchedule[day].trainings, addedTraining]
        }
      }
    }

    case "trainings/clone": {
      const { day, clonedTraining } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: [...weekSchedule[day].trainings, clonedTraining]
        }
      }
    }

    case "trainings/remove": {
      const { day, removedTraining } = action.payload;
      if (weekSchedule[day].trainings.length === 1) return weekSchedule;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.filter(tr => tr.trainingId !== removedTraining.trainingId),
        }
      }
    }

    default:
      return weekSchedule;
  }
}

// const updateSet = (sets: ExSetModel[], updatedSet: ExSetModel) => {
//   return sets.map(s => s.setId === updatedSet.setId ? updatedSet : s);
// }

// const addSet = (sets: ExSetModel[], addedSet: ExSetModel) => [...sets, addedSet];
// const removeSet = (sets: ExSetModel[], removedSet: ExSetModel) => sets.filter(s => s.setId !== removedSet.setId);
// const updateSet = (sets: ExSetModel[], updatedSet: ExSetModel) => sets.map(s => s.setId === updatedSet.setId ? updatedSet : s);

const spreadSet = (sets: ExSetModel[], spreadedSet: ExSetModel) => {
  let spreadPosition: number;
  return sets.map((s, idx) => {
    if (s.setId === spreadedSet.setId) {
      spreadPosition = idx;
    }
    if (spreadPosition !== undefined) {
      if (idx >= spreadPosition) {
        s.reps = spreadedSet.reps;
        s.weight = spreadedSet.weight;
      }
    }
    return { ...s };
  });
}

export { weekScheduleReducer };