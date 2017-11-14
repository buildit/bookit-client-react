// import parse from 'date-fns/parse'
import format from 'date-fns/format'

import startOfDay from 'date-fns/start_of_day'
import isSameDay from 'date-fns/is_same_day'

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

// "Re-export" functions from `date-fns` to reduce overall import statements
export { isSameDay }
