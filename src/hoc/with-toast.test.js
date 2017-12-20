import React from 'react'

import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { ToastContainer } from 'react-toastify'

import { mount } from 'enzyme'

import withToast from 'Hoc/with-toast'

const mockStore = configureMockStore()

jest.useFakeTimers()

jest.mock('Redux', () => ({
  actionCreators: {
    clearToasts: jest.fn(() => {
      expect(true).to.be.true
    }),
  },
  selectors: {
    getToasts: jest.fn().mockReturnValue('A Toast!'),
  },
}))

describe('with-toast', () => {
  const AComponent = () => (<div />)

  const WrappedComponent = withToast('success')(AComponent)

  describe('#withToast(WrappedComponent)', () => {
    it('connects a normal component to the redux store for booking properties', () => {
      const wrapper = mount(<Provider store={mockStore()}><div><WrappedComponent /><ToastContainer /></div></Provider>)
      const toasted = wrapper.find('Toasted(AComponent)')

      expect(toasted.prop('toasts')).to.equal('A Toast!')

      jest.runAllTimers()

      wrapper.unmount()

      console.log(toasted.debug())
    })
  })
})
