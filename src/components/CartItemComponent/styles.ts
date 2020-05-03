import styled from '../../config/styled-components';

export const CartItemContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 13px;
  height: 130px;
  margin: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ItemDisplayImg = styled.img`
  display: block;
  margin: auto;
  max-width: 60%;
`

export const QuantityIndicator = styled.div`
  border-radius: 50%;
  background-color: #FFCD69;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 50px;
  width: 50px;
  transform: translate(30%, 30%);
  text-align: center;
  display: table;
`

export const QuantitySpan = styled.span`
  display: table-cell;
  vertical-align: middle;
  font-family: Montserrat;
  font-size: 30px;
  font-weight: 600;
  color: #332D2D;
  line-height: 30px;
`