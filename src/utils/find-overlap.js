import IntervalTree from 'node-interval-tree'

export const findOverlap = (start, end) => {
  const intervalTree = new IntervalTree()
  return intervalTree.search(start, end)
}

export const buildBookingsIntervalTree = (bookings = []) => {
  const intervalTree = new IntervalTree()
  bookings.forEach(({ id, start, end }) => {
    intervalTree.insert(start, end, id)
  })
  return intervalTree
}
