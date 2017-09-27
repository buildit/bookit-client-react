import * as React from "react"
import * as ReactDOM from "react-dom"

import { Hello } from "./Hello"
import Root from './containers/Root'
import store from './store'
import history from './history'

import { AppContainer } from 'react-hot-loader'

import 'Styles/client.scss'

// TODO: set correct type for RootComponent
const render = (RootComponent: any) => {
  ReactDOM.render(
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

// if (module.hot) {
//   module.hot.accept('./containers/Root', () => render(Hello))
// }
