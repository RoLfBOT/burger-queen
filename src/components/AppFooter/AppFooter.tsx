import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
  FooterDiv,
  FooterTitleDiv,
  FooterTitle
} from './styles'

interface IProps extends RouteComponentProps {
  text: string
};

class AppFooter extends React.Component<IProps, {}> {

  public constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { pathname } = this.props.location   
    const { text } = this.props    

    return (
      <FooterDiv absolute={pathname !== '/menu'}>        
        <FooterTitleDiv>
          <FooterTitle>{text}</FooterTitle>
        </FooterTitleDiv>
      </FooterDiv>
    )
  }
}

export default withRouter(AppFooter);