import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { reduxForm } from 'redux-form'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Button from 'Components/Button'
import FormedBookingForm, { BookingForm } from 'Containers/BookingForm'

describe('<BookingForm />', () => {
  const props = { createBooking: jest.fn(), handleSubmit: jest.fn(), }

  it('renders itself and <Button /> given the default props', () => {
    const wrapper = shallow(<BookingForm { ...props } />)

    expect(wrapper.find(Button).find('button')).to.not.be.disabled
  })

  it('calls handleSubmit on click', () => {
    const mockStore = configureStore([])
    const store = mockStore({})
    props.handleSubmit.mockClear()
    const wrapper = mount(
      <Provider store={store}>
        <FormedBookingForm { ...props } />
      </Provider>
    )

    wrapper.find('button').simulate('click')
    expect(props.handleSubmit.mock.calls.length).to.equal(1)
  })

})
