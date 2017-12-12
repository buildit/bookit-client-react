import * as DT from './dates-times'

describe('dates-times', () => {
  describe('#getWeekDaysRange(date = new Date)', () => {
    it('should return an object including the range of week days plus the next and previous week dates', () => {
      const range = DT.getWeekDaysRange()
      expect(range).to.have.lengthOf(7)
    })
  })

  describe('#getPreviousAndNextWeekDates(date = new Date)', () => {
    it('should return an array of the start days of the next and previous weeks from a given date', () => {
      const theDate = new Date(2017, 10, 16)
      const previousWeekStart = '2017-11-09'
      const nextWeekStart = '2017-11-23'

      const [ previous, next ] = DT.getPreviousAndNextWeekDates(theDate)

      expect(previous).to.equal(previousWeekStart)
      expect(next).to.equal(nextWeekStart)
    })
  })

  describe('#formatWeek(date = new Date)', () => {
    it('should return the month on both start and end when the week overlaps two months', () => {
      const theDate = new Date(2017, 9, 30)
      const expected = 'Oct 30 - Nov 5 2017'

      const actual = DT.formatWeek(theDate)
      expect(actual).to.equal(expected)
    })

    it('should return the year on both start and end when the week overlaps the year', () => {
      const theDate = new Date(2015, 11, 28)
      const expected = 'Dec 28 2015 - Jan 3 2016'
      const actual = DT.formatWeek(theDate)
      expect(actual).to.equal(expected)
    })

    it('should return the month on just the start and year on just the end when there is no overlap for the week', () => {
      const theDate = new Date(2017, 10, 16)
      const expected = 'Nov 16 - 22 2017'

      const actual = DT.formatWeek(theDate)
      expect(actual).to.equal(expected)
    })
  })
})
