import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
  FooterDiv,
  FooterTitleDiv,
  FooterTitle,
  FooterIconDiv,
  FooterIcon
} from './styles';

import RaiseHandIcon from '../../assets/raiseHand.svg';

interface IProps extends RouteComponentProps{
  route?: string
};

class AppFooter extends React.Component<IProps, {}> {

  public constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { pathname } = this.props.location
    console.log(pathname) 
    return (
      <FooterDiv>
        <FooterIconDiv>
          <FooterIcon src={RaiseHandIcon} />
        </FooterIconDiv>
        <FooterTitleDiv>
          <FooterTitle>Raise your hand to start ordering</FooterTitle>
        </FooterTitleDiv>
      </FooterDiv>
    )
  }
}

export default withRouter(AppFooter);