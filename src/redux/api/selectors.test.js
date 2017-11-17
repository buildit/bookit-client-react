import { Map, Set } from 'immutable'

import { compose } from 'redux'

import { normalizeLocations, normalizeBookables, normalizeBookings } from './schema'
import { updateLocationEntities, updateBookableEntities, updateBookingEntities } from './reducer'

import * as selectors from './selectors'

// TODO: state bootstrapping/fixturizing is a little clunky? Who knew!?

const locations = { payload: normalizeLocations([{"id":1,"name":"NYC","timeZone":"America/New_York"},{"id":2,"name":"LON","timeZone":"Europe/London"}]) }
const bookables = { payload: normalizeBookables([{"id":1001,"locationId":1,"name":"Dev Red","disposition":{"closed":false,"reason":""},"bookings":[]},{"id":1002,"locationId":1,"name":"Dev Blue","disposition":{"closed":false,"reason":""},"bookings":[]},{"id":1003,"locationId":1,"name":"Dev White","disposition":{"closed":false,"reason":""},"bookings":[{"id":5,"bookableId":1003,"subject":"Wash Hands","start":"2017-11-16T12:28","end":"2017-11-16T13:28"}]},{"id":1004,"locationId":1,"name":"Dev Black","disposition":{"closed":false,"reason":""},"bookings":[]},{"id":1,"locationId":1,"name":"Red","disposition":{"closed":false,"reason":""},"bookings":[]}]) }
const bookings = { payload: normalizeBookings([{"id":1,"bookableId":1001,"subject":"My Booking","start":"2017-11-14T12:28","end":"2017-11-14T13:28"},{"id":2,"bookableId":1001,"subject":"Another Booking","start":"2017-11-15T13:28","end":"2017-11-15T14:28"},{"id":3,"bookableId":1002,"subject":"Plan All Things","start":"2017-11-15T15:28","end":"2017-11-15T16:28"},{"id":4,"bookableId":1002,"subject":"Execute Proletariat","start":"2017-11-15T19:28","end":"2017-11-15T20:28"},{"id":5,"bookableId":1003,"subject":"Wash Hands","start":"2017-11-16T12:28","end":"2017-11-16T13:28"},{"id":1001,"bookableId":1,"subject":"My Bookable","start":"2019-09-01T05:37","end":"2019-09-01T05:38"},{"id":1002,"bookableId":1,"subject":"My Bookable","start":"2019-10-31T03:56","end":"2019-10-31T03:57"},{"id":1003,"bookableId":1003,"subject":"White Room Booking Pew Pew","start":"2017-11-15T14:32","end":"2017-11-15T15:32"},{"id":1004,"bookableId":1,"subject":"A meeting in red","start":"2017-11-15T17:39","end":"2017-11-15T18:00"},{"id":1005,"bookableId":1004,"subject":"Pigeons For Everyone!","start":"2017-11-15T16:00","end":"2017-11-15T17:00"},{"id":1007,"bookableId":1001,"subject":"Make It Work!","start":"2017-11-15T17:29","end":"2017-11-15T18:29"},{"id":1008,"bookableId":1002,"subject":"A Booking Will Happen","start":"2017-11-15T17:33","end":"2017-11-15T18:33"},{"id":1009,"bookableId":1003,"subject":"BOOKING NOW IN WHITE","start":"2017-11-15T17:49","end":"2017-11-15T18:49"},{"id":1010,"bookableId":1004,"subject":"I CHOO-CHOO CHOOSE YOU","start":"2017-11-15T17:57","end":"2017-11-15T18:57"},{"id":1011,"bookableId":1,"subject":"CONSUME ALL AVAILABILITY","start":"2017-11-15T18:03","end":"2017-11-15T19:03"},{"id":1012,"bookableId":1,"subject":"CONSUME ALL AVAILABILITY FOREVER","start":"2017-11-15T19:03","end":"2017-11-15T19:30"},{"id":1013,"bookableId":1,"subject":"My Bookable","start":"2018-06-10T20:21","end":"2018-06-10T20:22"},{"id":1014,"bookableId":1,"subject":"My Bookable","start":"2019-08-25T04:05","end":"2019-08-25T04:06"},{"id":1015,"bookableId":1,"subject":"My Bookable","start":"2019-02-03T15:40","end":"2019-02-03T15:41"},{"id":1016,"bookableId":1,"subject":"My Bookable","start":"2018-10-24T05:28","end":"2018-10-24T05:29"}]) }

const entityState = Map({
  locations: Map({ entities: Map(), result: Set() }),
  bookables: Map({ entities: Map(), result: Set() }),
  bookings: Map({ entities: Map(), result: Set() }),
})

const entities = compose(
  state => updateBookingEntities(state, bookings),
  state => updateBookableEntities(state, bookables),
  state => updateLocationEntities(state, locations)
)(entityState)

const state = { entities }

describe('API selectors', () => {
  describe('#getBookingEntity(state, props)', () => {
    it('obtains a booking entity from the state via props', () => {
      expect(selectors.getBookingEntity(state, { id: 1 })).to.exist
    })

    it('obtains a booking entity from the state via props', () => {
      const bookingEntity = selectors.getBookingEntity(state, { id: 1 })
      const sameBookingEntity = selectors.getBookingEntity(state, { id: 1 })

      expect(bookingEntity).to.equal(sameBookingEntity)
    })
  })
})
