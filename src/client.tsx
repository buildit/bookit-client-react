import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import store from 'Store'
import history from 'History'

import Root from 'Containers/Root'

import 'Styles/client.scss'

const render = (RootComponent: any) => {
  ReactDOM.render(
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('Containers/Root', () => render(Root))
}
