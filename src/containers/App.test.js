import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import BookingButton from 'Components/BookingButton'

describe('<App />', () => {
  it('has a single <BookingButton /> component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(BookingButton)).to.exist
  })
})
