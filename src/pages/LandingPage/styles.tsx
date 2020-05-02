import styled, { StyledProps } from '../../config/styled-components'

type BannerTitleProps = StyledProps<{ bold: Boolean }>

export const LandingPageContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #CB2B20;
`
export const BannerSection = styled.div`
  padding: 16px;
`

export const LogoImg = styled.img`
  width: 245px;
  height: 215px;
`
export const BannerTitle = styled.h1`
  color: #fff;
  font-family: Montserrat;
  font-style: normal;
  font-size: 75px;
  line-height: 74px;
  ${(props: BannerTitleProps) => props.bold && `
    font-weight: bold;
  `}
`