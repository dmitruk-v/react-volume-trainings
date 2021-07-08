const LEAP_YEAR = 366;
const NORMAL_YEAR = 365;

// DAYS
// -------------------------------------------------------
const MONDAY = "monday" as const;
const TUESDAY = "tuesday" as const;
const WEDNESDAY = "wednesday" as const;
const THURSDAY = "thursday" as const;
const FRIDAY = "friday" as const;
const SATURDAY = "saturday" as const;
const SUNDAY = "sunday" as const;

const WEEK_DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] as const;

// MONTHS
// -------------------------------------------------------
const JANUARY = "january" as const;
const FEBRUARY = "february" as const;
const MARCH = "march" as const;
const APRIL = "april" as const;
const MAY = "may" as const;
const JUNE = "june" as const;
const JULY = "july" as const;
const AUGUST = "august" as const;
const SEPTEMBER = "september" as const;
const OCTOBER = "october" as const;
const NOVEMBER = "november" as const;
const DECEMBER = "december" as const;

const MONTHS = [
  JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER,
] as const;

export { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }
export { LEAP_YEAR, NORMAL_YEAR }
export { WEEK_DAYS, MONTHS }