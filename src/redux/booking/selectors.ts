import { RootState } from 'Redux'

export const getBookingStatus = (state: RootState) => state.booking.bookingStatus
