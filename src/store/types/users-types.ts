import { ScheduleId } from "./schedule-types";

type UsersModel = {
  [userId: string]: UserModel
}

type UserId = string;

type UserModel = {
  userId: UserId,
  name: string,
  password: string,
  email: string,
  scheduleId: ScheduleId,
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

export type { UsersModel, UserModel, UserId };