import React from 'react'
import { shallow } from 'enzyme'

import { BookablesList } from 'Containers/BookablesList'

describe('<BookablesList />', () => {
  it('renders a list of bookables on the page', () => {
    const setBookablesVisible = jest.fn()
    const dispatch = jest.fn()

    const wrapper = shallow(
      <BookablesList
        bookableIds={[1, 2]}
        setBookablesVisible={setBookablesVisible}
        dispatch={dispatch}
      />
    )

    console.log(wrapper.find('Connect(BookableItem)'))
    expect(wrapper.find('Connect(BookableItem)')).to.have.length(2)
  })
})
