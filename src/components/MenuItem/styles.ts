import styled from '../../config/styled-components';

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px;
`

export const ItemDisplayImage = styled.img`
  max-width: 80%;
`

export const ItemDisplayContainer = styled.div`
  width: 270px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F7F7F7;
  border-radius: 25px;
`

export const ItemName = styled.p`
  font-family: Montserrat;
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
  color: #000;
  margin-top: 20px;
`