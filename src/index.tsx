import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Routes from './routes'
import './assets/reset.css'

const App = () => (
  <Routes />
);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);