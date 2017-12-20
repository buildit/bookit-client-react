import React from 'react'
import { shallow } from 'enzyme'

import BookableAvailabilityItem from 'Components/BookableAvailabilityItem'

describe('<BookableAvailabilityItem />', () => {
  const props = {
    bookableId: 'abc',
    name: 'Bookable',
    closed: false,
    reason: null,
    onClick: jest.fn(),
  }

  it('renders without a closed reason when `closed` is false', () => {
    const wrapper = shallow(<BookableAvailabilityItem {...props} />)
    expect(wrapper).to.exist
  })

  it('renders with a closed reason when `closed` is true', () => {
    const propsCopy = { ...props, closed: true, reason: 'A Reason for closure' }
    const wrapper = shallow(<BookableAvailabilityItem {...propsCopy} />)

    expect(wrapper.find('p').text()).to.equal(propsCopy.reason)
  })

  it('calls `onClick` when `closed` is false', () => {
    const wrapper = shallow(<BookableAvailabilityItem {...props} />)

    wrapper.find('div').simulate('click')

    expect(props.onClick.mock.calls).to.have.lengthOf(1)
  })
})
