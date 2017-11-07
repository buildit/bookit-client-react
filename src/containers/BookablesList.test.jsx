import React from 'react'
import { mount } from 'enzyme'

import { fromJS } from 'immutable'

// import { Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import { apiMiddleware } from 'redux-api-middleware'

import BookablesList from 'Containers/BookablesList'

describe('<BookablesList />', () => {
  const initialState = {
    bookables: fromJS({
      entities: {
        '1': {
          id: 1,
          locationId: 1,
          name: 'Red',
          disposition: { closed: false, reason: '' },
          bookings: [],
        },
        '2': {
          id: 2,
          locationId: 1,
          name: 'Blue',
          disposition: { closed: true, reason: 'construction' },
          bookings: [],
        },
      },
      result: [1, 2],
    }),
  }

  it('renders a list of bookables on the page', () => {
    const mockStore = configureStore([apiMiddleware])
    const store = mockStore(initialState)
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <BookablesList />
        </MemoryRouter>
      </Provider>
    )
    // expect(wrapper.find('h3')).to.exist
  })
})
