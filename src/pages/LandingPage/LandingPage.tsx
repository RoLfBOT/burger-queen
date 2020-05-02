import * as React from 'react'
import AppFooter from './../../components/AppFooter'

import {
  LandingPageContainer,
  BannerSection,
  BannerTitle
} from './styles'

class LandingPage extends React.Component {

  public render(): JSX.Element {
    return (
      <LandingPageContainer>
        <BannerSection>
          <BannerTitle bold={false}>Welcome to</BannerTitle>
          <BannerTitle bold={true}>Contoso Burgers</BannerTitle>
        </BannerSection>
        <AppFooter/>
      </LandingPageContainer>
    )
  }
}

export default LandingPage;