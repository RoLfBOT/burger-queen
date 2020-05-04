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
import MenuItem from '../../components/MenuItem'
import CartItem from '../../components/CartItem'
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
    const footerText = cart && cart.length > 0 ? AppConstants.footerCheckoutText : AppConstants.footerMenuText
    return (
      <>
        <MenuPageContainer>
          <MenuCardColumn>
            <PageHeader>Place your Order</PageHeader>
            <MenuCardDiv id="menu-items">
              {Items.map(this._RenderMenuItems)}
            </MenuCardDiv>
            <AppFooter
              text={footerText}
            />
          </MenuCardColumn>
          {cart && cart.length > 0 && <CartColumn>
            <OrderTitleDiv><span>Your Order</span></OrderTitleDiv>
            <CartItemsDiv>
              {cart.map(this._RenderCardPanel)}
            </CartItemsDiv>
            <PrimaryButton
              styles={DoneButtonStyles}
              text="Done"
            />
          </CartColumn>}
        </MenuPageContainer>
      </>
    )
  }

  private _RenderMenuItems(menuItem: IMenuItem, index: number): JSX.Element {
    return (
      <MenuItem
        item={menuItem}
        key={index}
        addToCart={this._AddItemToCart}
      />
    )
  }

  private _RenderCardPanel(cartItem: ICartItem, index: number): JSX.Element {
    const { item, quantity } = cartItem

    return (
      <CartItem
        name={item.name}
        image={item.img}
        quantity={quantity}
        key={index}
      />
    )
    }

  private _AddItemToCart(item: IMenuItem): void {
    this.setState({ cart: this.state.cart.concat({ item, quantity: 1 }) })
  }
}

export default MenuPage;