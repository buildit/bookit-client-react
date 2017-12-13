import React from 'react'
import { shallow } from 'enzyme'

import Button from 'Components/Button'

import { BookingForm } from 'Containers/BookingForm'

describe('<BookingForm />', () => {
  const props = {
    createBooking: jest.fn(),
    handleSubmit: jest.fn(),
    initialize: jest.fn(),
    getBookablesForLocation: jest.fn(),
    getAvailability: jest.fn(),
  }

  it('renders itself and <Button /> given the default props', () => {
    const wrapper = shallow(<BookingForm { ...props } />)

    expect(wrapper.find(Button).find('button')).to.not.be.disabled
  })

  it('calls handleSubmit on click', () => {
    props.handleSubmit.mockClear()
    const wrapper = shallow(<BookingForm { ...props } />)

    wrapper.find(Button).shallow().find('button').simulate('click')

    expect(props.handleSubmit.mock.calls.length).to.equal(1)
  })

})
