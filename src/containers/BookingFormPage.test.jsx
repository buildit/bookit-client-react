import React from 'react'
import { shallow } from 'enzyme'

import BookingFormPage from './BookingFormPage'
import BookingForm from 'Containers/BookingForm'

describe('<BookingFormPage />', () => {
  it('has a single <BookingForm /> component', () => {
    const wrapper = shallow(<BookingFormPage />)
    expect(wrapper.find(BookingForm)).to.exist
  })
})
