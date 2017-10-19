import * as request from 'superagent'

export const bookRoom = () => request
  .post('https://integration-bookit-api.buildit.tools/v1/booking')
  .send({ bookableId: '-1', bookingId: '-2', startDateTime: '2017-10-02T22:03:27.409Z', endDateTime: '2017-10-02T22:04:27.409Z', subject: 'Getting to know you' })
  .set('Content-Type', 'application/json');
