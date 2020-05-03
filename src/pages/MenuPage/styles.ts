import styled from '../../config/styled-components'
import {IButtonStyles } from '@fluentui/react/lib/Button'

export const MenuPageContainer = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;  
  min-height: 0;
`

export const MenuCardColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  padding: 32px 32px 0 32px;
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
  margin: 32px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  overflow: auto;  
`

export const CartColumn = styled.div`
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  background-color: #F7F6F4;
`

export const OrderTitleDiv = styled.div`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 35px;
  line-height: 35px;
  background-color: #FFCD69;
  color: #000;
  height: 221px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
` 

export const CartItemsDiv = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const DoneButtonStyles: Partial<IButtonStyles> = {
  root: {
    margin: 12,
    backgroundColor: "#1BCF8E",
    color: "#fff",
    borderRadius: 17,
    fontFamily: "Montserrat",
    fontWeight: 600,
    lineHeight: 35,
    fontSize: 35,
    height: 100
  }
}