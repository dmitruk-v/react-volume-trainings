import { Actions, WeekScheduleModel } from "..";
import { createExerciseWithSpreadedSet } from "../../utils/schedule-utils";

// type ReadyState = "idle" | "loading" | "success" | "error";

// type State = {
//   weekSchedule: WeekScheduleModel,
//   readyState: ReadyState,
//   error: any
// }

const initialState: WeekScheduleModel = {
  Monday: { day: "Monday", trainings: [] },
  Tuesday: { day: "Tuesday", trainings: [] },
  Wednesday: { day: "Wednesday", trainings: [] },
  Thursday: { day: "Thursday", trainings: [] },
  Friday: { day: "Friday", trainings: [] },
  Saturday: { day: "Saturday", trainings: [] },
  Sunday: { day: "Sunday", trainings: [] }
}

const weekScheduleReducer = (weekSchedule: WeekScheduleModel = initialState, action: Actions): WeekScheduleModel => {
  console.log("inside weekScheduleReducer", action);

  switch (action.type) {

    case "schedule/load":
      return weekSchedule;

    case "schedule/load-success":
      return action.payload.schedule;

    // case "schedule/load-error":
    //   return {
    //     weekSchedule: weekSchedule,
    //     loading: false,
    //     error: true,
    //   }

    case "schedule/sets/add": {
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

    case "schedule/sets/update": {
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

    case "schedule/sets/updateSpread": {
      const { day, trainingId, exerciseId, spreadedSet } = action.payload;
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
                    ? createExerciseWithSpreadedSet(ex, spreadedSet)
                    : ex
                )
              }
              : tr
          )
        }
      }
    }

    case "schedule/sets/remove": {
      const { day, trainingId, exerciseId, removedSet } = action.payload;
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
                      sets: ex.sets.length > 1
                        ? ex.sets.filter(s => s.setId !== removedSet.setId)
                        : ex.sets
                    }
                    : ex
                )
              }
              : tr
          )
        }
      }
    }

    case "schedule/exercises/add": {
      const { day, trainingId, addedExercise } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.map(
            tr => tr.trainingId === trainingId
              ? {
                ...tr,
                exercises: [...tr.exercises, addedExercise]
              } : tr
          )
        }
      };
    }

    case "schedule/exercises/update": {
      const { day, trainingId, updatedExercise } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.map(
            tr => tr.trainingId === trainingId
              ? {
                ...tr,
                exercises: tr.exercises.map(
                  ex => ex.exerciseId === updatedExercise.exerciseId
                    ? updatedExercise
                    : ex
                )
              } : tr
          )
        }
      };
    }

    case "schedule/exercises/remove": {
      const { day, trainingId, removedExercise } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.map(
            tr => tr.trainingId === trainingId
              ? {
                ...tr,
                exercises: tr.exercises.length > 1
                  ? tr.exercises.filter(ex => ex.exerciseId !== removedExercise.exerciseId)
                  : tr.exercises
              } : tr
          )
        }
      };
    }

    case "schedule/trainings/add": {
      const { day, addedTraining } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: [...weekSchedule[day].trainings, addedTraining]
        }
      }
    }

    case "schedule/trainings/update": {
      const { day, updatedTraining } = action.payload;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.map(
            tr => tr.trainingId === updatedTraining.trainingId
              ? updatedTraining
              : tr
          )
        }
      }
    }

    case "schedule/trainings/remove": {
      const { day, removedTraining } = action.payload;
      if (weekSchedule[day].trainings.length === 1) return weekSchedule;
      return {
        ...weekSchedule,
        [day]: {
          ...weekSchedule[day],
          trainings: weekSchedule[day].trainings.filter(
            tr => tr.trainingId !== removedTraining.trainingId
          ),
        }
      }
    }

    case "schedule/trainingDay/update": {
      const { updatedDay } = action.payload;
      return {
        ...weekSchedule,
        [updatedDay.day]: updatedDay
      }
    }

    default:
      // const _exhaustiveCheck: never = action;
      return weekSchedule;
  }
}

export { weekScheduleReducer };