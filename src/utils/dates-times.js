import IntervalTree, { Node } from 'node-interval-tree'

import parse from 'date-fns/parse'
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

import addHours from 'date-fns/add_hours'
import addWeeks from 'date-fns/add_weeks'

import differenceInSeconds from 'date-fns/difference_in_seconds'

export const formatTime = datetime => format(datetime, 'h:mm A')
export const formatDate = (date, pattern = 'YYYY-MM-DD') => format(date, pattern)

export const getSecondOfDay = date => differenceInSeconds(date, startOfDay(date))
export const getIntervalInSeconds = (low, high) => [ getSecondOfDay(low), getSecondOfDay(high) ]
export const getWholeDayInterval = () => [ 0, 86399 ]  // getIntervalInSeconds(startOfDay(new Date), endOfDay(new Date))

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

// "Monkeypatch" node-interval-tree to allow for exclusive overlap testing
// rather than the baked-in default of inclusive overlaps
Node.prototype._getOverlappingRecords = function (currentNode, low, high) {
  console.log('FIGNUTS!', currentNode, low, high)
  if (currentNode.key < high && low < currentNode.getNodeHigh()) {
    // Nodes are overlapping, check if individual records in the node are overlapping
    var tempResults = []
    for (var i = 0; i < currentNode.records.length; i++) {
      if (currentNode.records[i].high > low) {
        tempResults.push(currentNode.records[i])
      }
    }
    return tempResults
  }
  return []
}

IntervalTree.prototype.search = function (low, high) {
  return this.tree.search(...getIntervalInSeconds(low, high)).map(function (v) { return v.data })
}

export const createIntervalTree = (intervals) => {
  const tree = new IntervalTree
  intervals.forEach(([ start, end, data ]) => tree.insert(...getIntervalInSeconds(start, end), data))
  return tree
}

// "Re-export" functions from `date-fns` to reduce overall import statements
export { addHours, isToday, isBefore, isAfter, isSameDay, addDays }
