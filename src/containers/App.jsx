import React from 'react'

import ApplicationRoutes from 'Containers/ApplicationRoutes'
import RefreshIframe from 'Containers/RefreshIframe'


const App = () => ([
  <ApplicationRoutes key="application-routes" />,
  <RefreshIframe key="refresh-iframe" />,
])

export default App
