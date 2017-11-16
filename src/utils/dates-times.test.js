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
      const previousWeekStart = '2017-11-06'
      const nextWeekStart = '2017-11-20'

      const [ previous, next ] = DT.getPreviousAndNextWeekDates(theDate)

      expect(previous).to.equal(previousWeekStart)
      expect(next).to.equal(nextWeekStart)
    })
  })
})
