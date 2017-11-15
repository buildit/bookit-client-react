// import parse from 'date-fns/parse'
import format from 'date-fns/format'

import startOfDay from 'date-fns/start_of_day'
import isSameDay from 'date-fns/is_same_day'
import isToday from 'date-fns/is_today'
import isBefore from 'date-fns/is_before'
import isAfter from 'date-fns/is_after'

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

// "Re-export" functions from `date-fns` to reduce overall import statements
export { isSameDay }
export { isToday }
export { isBefore }
export { isAfter }
