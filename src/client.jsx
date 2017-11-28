import React from 'react'
import { render } from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import Root from 'Containers/Root'

const renderRoot = (RootComponent: any) => {
  render(
    <AppContainer>
      <RootComponent />
    </AppContainer>,
    document.getElementById('app-root')
  )
}

renderRoot(Root)

if (module.hot) {
  module.hot.accept('Containers/Root', () => renderRoot(Root))
}
