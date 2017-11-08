import { findOverlap, buildBookingsIntervalTree } from './find-overlap'
import IntervalTree from 'node-interval-tree'

describe('#findOverlap(start, end)', () => {
  it('returns an empty array when given start and end', () => {
    const result = findOverlap(10, 20)
    expect(result).to.be.empty
  })
})

describe('#buildBookingsIntervalTree(bookings)', () => {
  const bookings = [
    {
      id: 'foo',
      start: 10,
      end: 20,
    },
    {
      id: 'bar',
      start: 25,
      end: 35,
    },
  ]

  it('returns an interval tree with no arguments when given no arguments', () => {
    const intervalTree = buildBookingsIntervalTree()
    expect(intervalTree).to.exist
    expect(intervalTree).to.be.an.instanceof(IntervalTree)
  })

  it('returns an interval tree with loaded intervals', () => {
    const intervalTree = buildBookingsIntervalTree(bookings)
    expect(intervalTree).to.be.an.instanceof(IntervalTree)
    expect(intervalTree.count).to.equal(bookings.length)
  })

  it('returns the correct search overlap when search is entirely inside start and end interval', () => {
    const intervalTree = buildBookingsIntervalTree(bookings)
    const overlap = intervalTree.search(11, 15)
    expect(overlap).to.have.lengthOf(1)
    expect(overlap[0]).to.equal('foo')
  })

  it('returns empty overlap when search is before start and end interval', () => {
    const intervalTree = buildBookingsIntervalTree(bookings)
    const overlap = intervalTree.search(1, 9)
    expect(overlap).to.have.lengthOf(0)
  })

  it('returns empty overlap when search is after start and end interval', () => {
    const intervalTree = buildBookingsIntervalTree(bookings)
    const overlap = intervalTree.search(36, 50)
    expect(overlap).to.have.lengthOf(0)
  })

  it('returns empty overlap when search is between bookings', () => {
    const intervalTree = buildBookingsIntervalTree(bookings)
    const overlap = intervalTree.search(21, 24)
    expect(overlap).to.have.lengthOf(0)
  })

  it('returns correct overlap when search one value overlaps', () => {
    const intervalTree = buildBookingsIntervalTree(bookings)
    const overlap = intervalTree.search(1, 10)
    expect(overlap).to.have.lengthOf(1)
  })

  it('returns two overlaps when search overlaps with both start and end intervals', () => {
    const intervalTree = buildBookingsIntervalTree(bookings)
    const overlap = intervalTree.search(1, 50)
    expect(overlap).to.have.lengthOf(2)
    expect(overlap).to.have.ordered.members(['foo', 'bar'])
  })
})
