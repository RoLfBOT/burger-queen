import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Routes from './routes'
import './assets/reset.css'
import './web.config'

const App = () => (
  <Routes />
);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);