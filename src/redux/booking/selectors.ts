import { RootState } from 'Redux'

export const getBookingStatus = (state: RootState) => state.bookingStatus
export const getBookingInstance = (state: RootState) => state.bookingInstance
