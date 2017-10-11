import { post } from 'wtfetch'

import { BookingRequest } from '../models/booking-request'
import { getAPIEndpoint } from '../utils/get-location'

export const createMeeting = (data: BookingRequest) => post(`${getAPIEndpoint()}/v1/booking`, {data})
