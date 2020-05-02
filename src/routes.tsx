import * as React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import {
  PageDiv
} from './styles';

import LandingPage from './pages/LandingPage'
import AppFooter from './components/AppFooter'

class Routes extends React.Component {

  public render(): JSX.Element {
    return (
      <PageDiv>
        <HashRouter>
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
          </Switch>
          <AppFooter />
        </HashRouter>
      </PageDiv>
    )
  }
}

export default Routes;