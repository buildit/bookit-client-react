import React from 'react'
import { shallow, mount } from 'enzyme'

import Button from './Button'
import { PingButton } from './PingButton'

describe('<PingButton />', () => {
  const props = { pingRequest: jest.fn(), pingStatus: false, requestInProgress: false }

  it('renders itself and <Button /> given the default props', () => {
    const wrapper = shallow(<PingButton { ...props } />)

    expect(wrapper.find('span')).to.not.exist
    expect(wrapper.find(Button).find('button')).to.not.be.disabled
  })

  it('renders a span when pingStatus is true', () => {
    const newProps = { ...props, pingStatus: true }
    const wrapper = shallow(<PingButton { ...newProps } />)

    expect(wrapper.find('span')).to.exist
  })

  it('calls pingRequest on click', () => {
    const wrapper = mount(<PingButton { ...props } />)

    wrapper.find('button').simulate('click')
    expect(props.pingRequest.mock.calls.length).to.equal(1)
  })
})
