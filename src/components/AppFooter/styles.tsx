import styled from '../../config/styled-components';

export const FooterDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: auto;
  border-radius: 30px 30px 0 0;
  height: 25%;
  width: calc(100% - 64px);
`

export const FooterTitleDiv = styled.div`
  width: 45%;
`

export const FooterTitle = styled.h1`
  font-family: Montserrat;
  font-size: 50px;
  line-height: 50px;
  color: #000;
`

export const FooterIconDiv = styled.div`
  margin: 0 16px;
  border-radius: 50%;
  border: 2px solid black;
`

export const FooterIcon = styled.img`
  width: 60px;
  height: 80px;
  margin: 26px;
  vertical-align: middle;
`