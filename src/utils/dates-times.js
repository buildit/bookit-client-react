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

import differenceInMinutes from 'date-fns/difference_in_minutes'
import parse from 'date-fns/parse'

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

// const weekOptions = { weekStartsOn: 1 }

export const getWeekStartAndEnd = (date = new Date) => {
  const weekStart = parse(date)
  const weekEnd = addDays(date, 6)
  return [ weekStart, weekEnd ]
}

export const getWeekDaysRange = (date = new Date) => {
  const [ weekStart, weekEnd ] = getWeekStartAndEnd(date)
  return eachDay(weekStart, weekEnd, 1).map(day => formatDate(day))
}

export const getPreviousAndNextWeekDates = (date = new Date) => {
  const previous = addWeeks(date, -1)
  const next = addWeeks(date, 1)
  return [ formatDate(previous), formatDate(next) ]
}

export const formatWeek = (date = new Date) => {
  const [ weekStart, weekEnd ] = getWeekStartAndEnd(date)
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
export { isSameDay }
export { isToday }
export { isBefore }
export { isAfter }
