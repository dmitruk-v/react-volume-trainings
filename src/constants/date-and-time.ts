const LEAP_YEAR = 366;
const NORMAL_YEAR = 365;

// DAYS
// -------------------------------------------------------
const MONDAY = "Monday" as const;
const TUESDAY = "Tuesday" as const;
const WEDNESDAY = "Wednesday" as const;
const THURSDAY = "Thursday" as const;
const FRIDAY = "Friday" as const;
const SATURDAY = "Saturday" as const;
const SUNDAY = "Sunday" as const;

const WEEK_DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] as const;

// MONTHS
// -------------------------------------------------------
const JANUARY = "January" as const;
const FEBRUARY = "February" as const;
const MARCH = "March" as const;
const APRIL = "April" as const;
const MAY = "May" as const;
const JUNE = "June" as const;
const JULY = "July" as const;
const AUGUST = "August" as const;
const SEPTEMBER = "September" as const;
const OCTOBER = "October" as const;
const NOVEMBER = "November" as const;
const DECEMBER = "December" as const;

const MONTHS = [
  JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER,
] as const;

export { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY }
export { LEAP_YEAR, NORMAL_YEAR }
export { WEEK_DAYS, MONTHS }