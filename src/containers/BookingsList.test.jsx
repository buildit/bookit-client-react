import React from 'react'
import { shallow } from 'enzyme'

import BookingsList from 'Containers/BookingsList'

describe('<BookingsList />', () => {
  it('renders itself with a heading', () => {
    const wrapper = shallow(<BookingsList />)
    expect(wrapper.find('h2')).to.exist
  })
})
