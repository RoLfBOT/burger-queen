import styled, { StyledProps } from '../../config/styled-components';

interface IAppFooterStyles {
  absolute: boolean  
}

interface IAppFooterTextStyles {
  fontSize: number
}

type AppFooterStyles = StyledProps<IAppFooterStyles>
type AppFooterTextStyles = StyledProps<IAppFooterTextStyles>

export const FooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #E8E8E8;
  margin: auto auto 0 auto;
  padding: 0 32px;
  border-radius: 30px 30px 0 0;
  height: 25%;
  width: calc(100% - 64px);
  box-sizing: border-box;
  ${(props: AppFooterStyles) => props.absolute && `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  `}
`

export const FooterTitleDiv = styled.div`
  padding: 32px;
`

export const FooterTitle = styled.h1`
  font-family: Montserrat;
  font-size: ${(props: AppFooterTextStyles) => props.fontSize + 'px'};
  line-height: 50px;
  color: #000;
`