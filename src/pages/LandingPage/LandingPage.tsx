import * as React from 'react'

import {
  LandingPageContainer,
  BannerSection,
  BannerTitle
} from './styles'
import { AppConstants } from '../../utils/AppConstants'
import AppFooter from '../../components/AppFooter'

class LandingPage extends React.Component {

  public render(): JSX.Element {
    return (
      <>
        <LandingPageContainer>
          <BannerSection>
            <BannerTitle bold={false}>Welcome to</BannerTitle>
            <BannerTitle bold={true}>Contoso Burgers</BannerTitle>
          </BannerSection>
        </LandingPageContainer>
        <AppFooter text={AppConstants.footerLandingText} />
      </>
    )
  }
}

export default LandingPage;