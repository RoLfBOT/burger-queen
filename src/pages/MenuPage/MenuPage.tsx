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
import OrderDialog from '../../components/OrderDialog'
import { AppConstants } from '../../utils/AppConstants'

interface IState {
  cart: ICartItem[]
  showDialog: boolean
}

class MenuPage extends React.Component<{}, IState> {

  public state: IState = {
    cart: [],
    showDialog: false
  }

  public constructor(props: {}) {
    super(props)
    this._AddItemToCart = this._AddItemToCart.bind(this)
    this._RenderMenuItems = this._RenderMenuItems.bind(this)
    this._OpenOrderDialog = this._OpenOrderDialog.bind(this)
    this._HideOrderDialog = this._HideOrderDialog.bind(this)
  }

  public render(): JSX.Element {
    const { Items } = MenuData as IMenu
    const { cart, showDialog} = this.state
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
        <OrderDialog
          isDialogOpen={showDialog}
          hideDialog={this._HideOrderDialog}
        />
      </>
    )
  }

  private _RenderMenuItems(menuItem: IMenuItem, index: number): JSX.Element {
    return (
      <MenuItem
        name={menuItem.name}
        image={menuItem.img}
        onClick={this._OpenOrderDialog}
        key={index}
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

  private _OpenOrderDialog(): void {
    this.setState({ showDialog: true })
  }

  private _HideOrderDialog(): void {
    this.setState({ showDialog: false })
  }

  private _AddItemToCart(event: React.MouseEvent<HTMLDivElement>): void {
    const cartItem = { name: "Supreme Burger", img: "https://burgerhubstorageaccount.blob.core.windows.net/images/mcdonalds-burger-png-12%20(1).png" } as IMenuItem

    this.setState({ cart: [{ item: cartItem, quantity: 1 }] })
  }
}

export default MenuPage;