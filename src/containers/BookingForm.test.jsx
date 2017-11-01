import React from 'react'
import { shallow, mount } from 'enzyme'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { apiMiddleware } from 'redux-api-middleware'
import { MemoryRouter } from 'react-router'

import Button from 'Components/Button'
import FormedBookingForm, { BookingForm } from 'Containers/BookingForm'

describe('<BookingForm />', () => {
  const props = {
    createBooking: jest.fn(),
    handleSubmit: jest.fn(),
    initialize: jest.fn(),
    getBookablesForLocation: jest.fn(),
  }

  it('renders itself and <Button /> given the default props', () => {
    const wrapper = shallow(<BookingForm { ...props } />)

    expect(wrapper.find(Button).find('button')).to.not.be.disabled
  })

  it('calls handleSubmit on click', () => {
    const mockStore = configureStore([apiMiddleware])
    const store = mockStore({})
    props.handleSubmit.mockClear()
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <FormedBookingForm { ...props } />
        </MemoryRouter>
      </Provider>
    )

    wrapper.find('button').simulate('click')
    expect(props.handleSubmit.mock.calls.length).to.equal(1)
  })

})
