import styled from '../../config/styled-components'

export const MenuPageContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: calc(100vh - 25%);
  padding: 32px;
  box-sizing: border-box;
`

export const PageHeader = styled.h1`  
  font-family: Montserrat;
  font-size: 50px;
  font-weight: 600;
  line-height: 50px;
  color: #000;
`

export const MenuCardDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow: auto;
`