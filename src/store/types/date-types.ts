import { MONTHS, WEEK_DAYS } from "../../constants/date-and-time";

type WeekDays = typeof WEEK_DAYS;
type WeekDay = WeekDays[number];

type Months = typeof MONTHS;
type Month = Months[number];

export type { Months, Month, WeekDays, WeekDay }