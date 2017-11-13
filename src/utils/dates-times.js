// import parse from 'date-fns/parse'
import startOfDay from 'date-fns/start_of_day'
import differenceInMinutes from 'date-fns/difference_in_minutes'

export const getIntervalInMinutes = (low, high) => {
  const start = startOfDay(low)
  return [
    differenceInMinutes(low, start),
    differenceInMinutes(high, start),
  ]
}
