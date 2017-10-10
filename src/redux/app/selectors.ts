import { RootState } from 'Redux'

export const getRequestInProgress = (state: RootState) => state.app.requestInProgress
