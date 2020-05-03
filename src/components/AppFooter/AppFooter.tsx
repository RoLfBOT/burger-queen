import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
  FooterDiv,
  FooterTitleDiv,
  FooterTitle
} from './styles';
import { AppConstants } from "../../utils/AppConstants"

interface IProps extends RouteComponentProps {
  route?: string
};

class AppFooter extends React.Component<IProps, {}> {

  public constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { pathname } = this.props.location    
    const footerText = pathname === "/menu" ? AppConstants.footerMenuText : AppConstants.footerLandingText

    return (
      <FooterDiv>        
        <FooterTitleDiv>
          <FooterTitle>{footerText}</FooterTitle>
        </FooterTitleDiv>
      </FooterDiv>
    )
  }
}

export default withRouter(AppFooter);