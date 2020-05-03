import styled from '../../config/styled-components';

export const FooterDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E8E8E8;
  margin: auto;
  padding: 0 32px;
  border-radius: 30px 30px 0 0;
  height: 25%;
  width: calc(100% - 64px);
  box-sizing: border-box;
`

export const FooterTitleDiv = styled.div`
  padding: 32px;
`

export const FooterTitle = styled.h1`
  font-family: Montserrat;
  font-size: 50px;
  line-height: 50px;
  color: #000;
`