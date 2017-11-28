// import parse from 'date-fns/parse'
import format from 'date-fns/format'

import startOfDay from 'date-fns/start_of_day'
import isSameDay from 'date-fns/is_same_day'
import isToday from 'date-fns/is_today'
import isBefore from 'date-fns/is_before'
import isAfter from 'date-fns/is_after'
import isSameMonth from 'date-fns/is_same_month'
import isSameYear from 'date-fns/is_same_year'

import addDays from 'date-fns/add_days'
import eachDay from 'date-fns/each_day'

import addWeeks from 'date-fns/add_weeks'
import startOfWeek from 'date-fns/start_of_week'
import lastDayOfWeek from 'date-fns/last_day_of_week'

import differenceInMinutes from 'date-fns/difference_in_minutes'

export const formatTime = datetime => format(datetime, 'h:mm A')
export const formatDate = (date, pattern = 'YYYY-MM-DD') => format(date, pattern)

export const getIntervalInMinutes = (low, high) => {
  const start = startOfDay(low)
  return [
    differenceInMinutes(low, start),
    differenceInMinutes(high, start),
  ]
}

export const compareDates = (dateA, dateB) => {
  if (isBefore(dateA, dateB)) {
    return -1
  }
  if (isAfter(dateA, dateB)) {
    return 1
  }
  return 0
}

const weekOptions = { weekStartsOn: 1 }

export const getStartEnd = (date = new Date) => ({
  start: formatDate(date),
  end: formatDate(addDays(date, 1)),
})

export const getWeekStartAndEnd = (date = new Date, excludeWeekend = true) => {
  const weekStart = startOfWeek(date, weekOptions)
  const weekEnd = addDays(lastDayOfWeek(date, weekOptions), excludeWeekend ? -2 : 0)
  return [ weekStart, weekEnd ]
}

export const getWeekDaysRange = (date = new Date, excludeWeekend = true) => {
  const [ weekStart, weekEnd ] = getWeekStartAndEnd(date, excludeWeekend)
  return eachDay(weekStart, weekEnd, 1).map(day => formatDate(day))
}

export const getPreviousAndNextWeekDates = (date = new Date) => {
  const previous = addWeeks(startOfWeek(date, weekOptions), -1)
  const next = addWeeks(startOfWeek(date, weekOptions), 1)
  return [ formatDate(previous), formatDate(next) ]
}

export const formatWeek = (date = new Date, excludeWeekend = true) => {
  const [ weekStart, weekEnd ] = getWeekStartAndEnd(date, excludeWeekend)
  let weekStartPattern = 'MMM D'
  let weekEndPattern = 'D YYYY'
  if (!isSameMonth(weekStart, weekEnd)) {
    weekEndPattern = 'MMM D YYYY'
  }
  if (!isSameYear(weekStart, weekEnd)) {
    weekStartPattern = 'MMM D YYYY'
  }
  const formatWeekStart = format(weekStart, weekStartPattern)
  const formatWeekEnd = format(weekEnd, weekEndPattern)
  return `${formatWeekStart} - ${formatWeekEnd}`
}

// "Re-export" functions from `date-fns` to reduce overall import statements
export { addDays }
export { isSameDay }
export { isToday }
export { isBefore }
export { isAfter }
