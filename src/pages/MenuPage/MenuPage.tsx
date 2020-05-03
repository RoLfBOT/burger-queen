import * as React from 'react'

import {
  MenuPageContainer,
  MenuCardColumn,
  MenuCardDiv,
  PageHeader,
  CartColumn,
  OrderTitleDiv,
  CartItemsDiv,
  DoneButtonStyles
} from './styles'

import { PrimaryButton } from '@fluentui/react/lib/Button'

import AppFooter from '../../components/AppFooter'
import MenuData, { IMenu, IMenuItem, ICartItem } from '../../utils/DataHelper'
import MenuItemComponent from '../../components/MenuItemComponent'
import CartItemComponent from '../../components/CartItemComponent'
import { AppConstants } from '../../utils/AppConstants'

interface IState {
  cart: ICartItem[]
}

class MenuPage extends React.Component<{}, IState> {

  public state: IState = {
    cart: []
  }

  public constructor(props: {}) {
    super(props)
    this._AddItemToCart = this._AddItemToCart.bind(this)
    this._RenderMenuItems = this._RenderMenuItems.bind(this)
  }

  public render(): JSX.Element {
    const { Items } = MenuData as IMenu
    const { cart } = this.state
    return (
      <>
        <MenuPageContainer>
          <MenuCardColumn>
            <PageHeader>Place your Order</PageHeader>
            <MenuCardDiv id="menu-items">
              {Items.map(this._RenderMenuItems)}
            </MenuCardDiv>
            <AppFooter
              text={AppConstants.footerMenuText}
            />
          </MenuCardColumn>
          <CartColumn>
            <OrderTitleDiv><span>Your Order</span></OrderTitleDiv>
            <CartItemsDiv>
              {cart.map(this._RenderCardPanel)}
            </CartItemsDiv>
            <PrimaryButton
              styles={DoneButtonStyles}
              text="Done"
            />
          </CartColumn>
        </MenuPageContainer>
      </>
    )
  }

  private _RenderMenuItems(menuItem: IMenuItem, index: number): JSX.Element {
    return (
      <MenuItemComponent
        name={menuItem.name}
        image={menuItem.img}
        onClick={this._AddItemToCart}
        key={index}
      />
    )
  }

  private _RenderCardPanel(cartItem: ICartItem, index: number): JSX.Element {
    const { item, quantity } = cartItem

    return (
      <CartItemComponent
        name={item.name}
        image={item.img}
        quantity={quantity}
        key={index}
      />
    )
  }

  private _AddItemToCart(event: React.MouseEvent<HTMLDivElement>): void {
    const cartItem = { name: "Supreme Burger", img: "https://burgerhubstorageaccount.blob.core.windows.net/images/mcdonalds-burger-png-12%20(1).png" } as IMenuItem

    this.setState({ cart: [{ item: cartItem, quantity: 1 }] })
  }
}

export default MenuPage;