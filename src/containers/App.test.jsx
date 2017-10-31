import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import BookingForm from 'Containers/BookingForm'

describe('<App />', () => {
  it('has a single <BookingForm /> component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(BookingForm)).to.exist
  })
})
