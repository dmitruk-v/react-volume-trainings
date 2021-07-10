import { NORMAL_YEAR, LEAP_YEAR, WEEK_DAYS, MONTHS } from "../constants/date-and-time";

const getDayName = (day: number) => {
  return WEEK_DAYS[(day + 6) % WEEK_DAYS.length];
}

const getMonthName = (month: number) => {
  return MONTHS[month];
}

const fromMs = (ms: number) => {
  const result = {
    relative: {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      months: 0,
      years: 0
    },
    absolute: {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      months: 0,
      years: 0
    }
  };

  if (ms < 1000) {
    result.relative.milliseconds = ms;
    return result;
  }
  result.absolute.milliseconds = ms;

  const msPart = ms % 1000;
  const seconds = Math.floor(ms / 1000);

  if (seconds < 60) {
    result.relative.milliseconds = msPart;
    result.relative.seconds = seconds;
    return result;
  }
  result.absolute.seconds = ms / 1000;

  const secondsPart = seconds % 60;
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    result.relative.milliseconds = msPart;
    result.relative.seconds = secondsPart;
    result.relative.minutes = minutes;
    return result;
  }
  result.absolute.minutes = ms / (1000 * 60);

  const minutesPart = minutes % 60;
  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    result.relative.milliseconds = msPart;
    result.relative.seconds = secondsPart;
    result.relative.minutes = minutesPart;
    result.relative.hours = hours
    return result;
  }
  result.absolute.hours = ms / (1000 * 60 * 60);

  const hoursPart = hours % 24;
  const days = Math.floor(hours / 24);

  result.relative.milliseconds = msPart;
  result.relative.seconds = secondsPart;
  result.relative.minutes = minutesPart;
  result.relative.hours = hoursPart;
  result.relative.days = days;

  result.absolute.days = ms / (1000 * 60 * 60 * 24);

  return result;
}

const getYearDaysCount = (year: number) => {
  if (year % 400 === 0) return LEAP_YEAR;
  if (year % 100 === 0) return NORMAL_YEAR;
  if (year % 4 === 0) return LEAP_YEAR;
  return NORMAL_YEAR;
}

const getLastDayOfMonth = (year: number, month: number): number => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

const getSecondsToday = (): number => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = now.getTime() - startDate.getTime();
  return diff / 1000;
}

const getSecondsToTomorrow = (): number => {
  const now = new Date();
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const diff = endDate.getTime() - now.getTime();
  return diff / 1000;
}

const formatDate = (date: Date) => {
  const now = new Date();
  const msDiff = now.getTime() - date.getTime();
  const secondsDiff = msDiff / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;

  if (secondsDiff < 1) {
    return `*** Right now! ***`;
  }

  if (minutesDiff < 1) {
    return `*** ${secondsDiff} seconds ago! ***`;
  }

  if (hoursDiff < 1) {
    return `*** ${minutesDiff} minutes ago! ***`;
  }

  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

const getWeekdayDates = (year: number, day: number): Date[] => {
  const dates = [];
  const daysInYear = getYearDaysCount(year);
  for (let i = 0; i < daysInYear; i++) {
    const curr = new Date(year, 0, i);
    if (curr.getDay() === day) {
      dates.push(curr);
    }
  }
  return dates;
}

const getCurrentWeekStartDate = (): Date => {
  const now = new Date();
  const weekDayNum = now.getDay();
  return weekDayNum === 1
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate() - (weekDayNum + 6) % WEEK_DAYS.length, 0);
}

const getDaysCountBetweenDates = (begin: Date, end: Date) => {
  return (end.getTime() - begin.getTime()) / (1000 * 60 * 60 * 24);
}

export {
  fromMs,
  getLastDayOfMonth,
  getSecondsToTomorrow,
  getSecondsToday,
  formatDate,
  getYearDaysCount,
  getWeekdayDates,
  getDayName,
  getMonthName,
  getCurrentWeekStartDate,
  getDaysCountBetweenDates
}