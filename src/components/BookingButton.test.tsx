import * as React from 'react'
import { shallow, mount } from 'enzyme'

import Button from './Button'
import { BookingButton } from './BookingButton'

describe('<BookingButton />', () => {
  const props = { handleBookingRequest: jest.fn(), bookingStatus: false, requestInProgress: false }

  it('renders itself and <Button /> given the default props', () => {
    const wrapper = shallow(<BookingButton { ...props } />)

    expect(wrapper.find('span')).to.not.exist
    expect(wrapper.find(Button).find('button')).to.not.be.disabled
  })

  it('renders a span when bookingStatus is true', () => {
    const newProps = { ...props, bookingStatus: true }
    const wrapper = shallow(<BookingButton { ...newProps } />)

    expect(wrapper.find('span')).to.exist
  })

  it('calls bookingRequest on click', () => {
    const wrapper = mount(<BookingButton { ...props } />)

    wrapper.find('button').simulate('click')
    expect(props.handleBookingRequest.mock.calls.length).to.equal(1)
  })
})
