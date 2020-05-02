import * as React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import {
  PageDiv
} from './styles';

import AppFooter from './components/AppFooter'
import LandingPage from './pages/LandingPage'
import MainPage from './pages/MenuPage'

class Routes extends React.Component {

  public render(): JSX.Element {
    return (
      <PageDiv>
        <HashRouter>
          <Switch>
            <Route exact path={'/'} component = {LandingPage} />
            <Route exact path = {'/menu/'} component = {MainPage} />
          </Switch>
          <AppFooter />
        </HashRouter>
      </PageDiv>
    )
  }
}

export default Routes;