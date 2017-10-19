/* eslint-env jest */

import {bookRoom}  from './bookit-api'
//const bookitAPI = require('./bookit-api')

describe('#bookRoom()', () => {
  it('booking should return expected elements', () => {
    return bookRoom()
      .then(data => {
        expect(data).toBeDefined();
        expect(data.body.bookingId).toBeDefined();
        expect(data.body.bookableId).toBeDefined();
        expect(data.body.subject).toBeDefined();
        expect(data.body.startDateTime).toBeDefined();
        expect(data.body.endDateTime).toBeDefined();
      })
  })
});
