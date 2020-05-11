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
import PaymentDialog from '../../components/PaymentDialog'
import { AppConstants } from '../../utils/AppConstants'

interface IState {
  cart: ICartItem[]
  showPayment: boolean
  itemDialog: boolean
}

class MenuPage extends React.Component<{}, IState> {

  private _imageRef = React.createRef<HTMLImageElement>();

  public state: IState = {
    cart: [],
    showPayment: false,
    itemDialog: false
  }

  public constructor(props: {}) {
    super(props)
    this._AddItemToCart = this._AddItemToCart.bind(this)
    this._RenderMenuItems = this._RenderMenuItems.bind(this)
    this._OpenPaymentDialog = this._OpenPaymentDialog.bind(this)
    this._HidePayementDialog = this._HidePayementDialog.bind(this)
    this._ChangeItemDialogState = this._ChangeItemDialogState.bind(this)
  }

  public render(): JSX.Element {
    const { Items } = MenuData as IMenu
    const { cart, showPayment } = this.state
    const footerText = cart && cart.length > 0 ? AppConstants.footerCheckoutText : AppConstants.footerMenuText
    const footerFontSize = cart && cart.length > 0 ? 30 : 40
    return (
      <>
        <img ref={this._imageRef} src="https://burgerhubstorageaccount.blob.core.windows.net/images/yellow_cursor.png" id="cursor_icon" />
        <MenuPageContainer>
          <MenuCardColumn>
            <PageHeader>Place your Order</PageHeader>
            <MenuCardDiv id="menu-items">
              {Items.map(this._RenderMenuItems)}
            </MenuCardDiv>
            <AppFooter
              text={footerText}
              fontSize={footerFontSize}
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
              onClick={this._OpenPaymentDialog}
            />
          </CartColumn>}
        </MenuPageContainer>
        <PaymentDialog
          isDialogOpen={showPayment}
          hideDialog={this._HidePayementDialog}
          imgRef={this._imageRef}
        />
      </>
    )
  }

  private _RenderMenuItems(menuItem: IMenuItem, index: number): JSX.Element {
    const { itemDialog } = this.state
    return (
      <MenuItem
        item={menuItem}
        key={index}
        addToCart={this._AddItemToCart}
        imgRef={this._imageRef}
        index={index}
        updateParentDialogState={this._ChangeItemDialogState}
        connectObserver={!itemDialog}
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

  private _OpenPaymentDialog(): void {
    this.setState({ showPayment: true })
  }

  private _HidePayementDialog(): void {
    this.setState({ showPayment: false })
  }

  private _ChangeItemDialogState(value: boolean): void {
    this.setState({ itemDialog: value })
  }
}

export default MenuPage;