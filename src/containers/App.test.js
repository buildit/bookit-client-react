import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
  it('has an H2 with the text "HOWBOUTDAH?"', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h2')).to.have.text('HOWBOWDAH?')
  })
})
