import * as React from 'react';

import {
  FooterDiv,
  FooterTitleDiv,
  FooterTitle,
  FooterIconDiv,
  FooterIcon
} from './styles';

import RaiseHandIcon from '../../assets/raiseHand.svg';

class AppFooter extends React.Component {

  public render(): JSX.Element {
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

export default AppFooter;