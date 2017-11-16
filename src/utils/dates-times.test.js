import * as DT from './dates-times'

describe('dates-times', () => {
  describe('#getWeekDaysRange(date = new Date, excludeWeekends = true)', () => {
    it('should return an object including the range of week days plus the next and previous week dates', () => {
      const range = DT.getWeekDaysRange()
      expect(range).to.have.lengthOf(5)
    })
  })

  describe('#getPreviousAndNextWeekDates(date = new Date)', () => {
    it('should return an array of the start days of the next and previous weeks from a given date', () => {
      const theDate = new Date(2017, 10, 16)
      const nextWeekStart = new Date(2017, 10, 20)
      const previousWeekStart = new Date(2017, 10, 6)

      const [ previous, next ] = DT.getPreviousAndNextWeekDates(theDate)

      expect(next.toDateString()).to.equal(nextWeekStart.toDateString())
      expect(previous.toDateString()).to.equal(previousWeekStart.toDateString())
    })
  })
})
