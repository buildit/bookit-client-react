// TODO: set types properly
export const createReducer = (initialState: any, handlers: any) => (state = initialState, action: any) => (
  {}.hasOwnProperty.call(handlers, action.type) ? handlers[action.type](state, action) : state
)
