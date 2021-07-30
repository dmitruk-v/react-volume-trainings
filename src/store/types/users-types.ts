import { ScheduleId } from "./schedules-types";

type UsersModel = {
  [userId: string]: UserModel
}

type UserModel = {
  userId: string,
  name: string,
  scheduleId: ScheduleId,
  optionsId: string,
  measurements: {
    [date: string]: {
      height: number,
      weight: number,
      girth: {
        neck: number,
        chest: number,
        biceps: number,
        forearm: number,
        waist: number,
        buttocks: number,
        hip: number,
        calf: number,
      }
    }
  }
}

export type { UsersModel, UserModel };