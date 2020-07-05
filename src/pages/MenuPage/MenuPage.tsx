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

import { PrimaryButton, IButtonProps } from '@fluentui/react/lib/Button'

import AppFooter from '../../components/AppFooter'
import MenuData, { IMenu, IMenuItem, ICartItem } from '../../utils/DataHelper'
import MenuItem from '../../components/MenuItem'
import OrderDialog from '../../components/OrderDialog'
import CartItem from '../../components/CartItem'
import PaymentDialog from '../../components/PaymentDialog'
import { AppConstants } from '../../utils/AppConstants'

interface IState {
  cart: ICartItem[]
  showPayment: boolean
  itemDialogOpen: boolean
  isThumbsUp: boolean
  selectedItem?: IMenuItem
}

class MenuPage extends React.Component<{}, IState> {

  private _imageRef = React.createRef<HTMLImageElement>();
  private _timer: number = -1
  private observer = new MutationObserver((mutations: MutationRecord[]) => this._MutationHandler(mutations))

  public state: IState = {
    cart: [],
    showPayment: false,
    itemDialogOpen: false,
    isThumbsUp: false,
    selectedItem: undefined
  }

  public constructor(props: {}) {
    super(props)
    this._AddItemToCart = this._AddItemToCart.bind(this)
    this._RenderMenuItems = this._RenderMenuItems.bind(this)
    this._OpenPaymentDialog = this._OpenPaymentDialog.bind(this)
    this._HidePayementDialog = this._HidePayementDialog.bind(this)
    this._ChangeItemDialogState = this._ChangeItemDialogState.bind(this)
    this._ThumbsStatusUpdate = this._ThumbsStatusUpdate.bind(this)
    this._MutationHandler = this._MutationHandler.bind(this)
    this._HideOrderDialog = this._HideOrderDialog.bind(this)
  }

  public componentDidMount(): void {
    const target = this._imageRef.current;
    this.observer.observe(target as Node, { attributes: true, attributeFilter: ['style'] });
  }

  public componentWillUnmount(): void {
    this.observer.disconnect()
  }

  public render(): JSX.Element {
    const { Items } = MenuData as IMenu
    const { cart, showPayment, itemDialogOpen, isThumbsUp, selectedItem } = this.state
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
              isOrderOpen={this.state.itemDialogOpen}
              thumbsStatusUpdate={this._ThumbsStatusUpdate}
            />
          </MenuCardColumn>
          {cart && cart.length > 0 &&
            <CartColumn>
              <OrderTitleDiv><span>Your Order</span></OrderTitleDiv>
              <CartItemsDiv>
                {cart.map(this._RenderCardPanel)}
              </CartItemsDiv>
              <PrimaryButton
                id="done"
                styles={DoneButtonStyles}
                text="Done"
                onClick={this._OpenPaymentDialog}
                onRenderText={this._RenderButtonContent}
              />
            </CartColumn>
          }
        </MenuPageContainer>
        {selectedItem &&
          <OrderDialog
            isDialogOpen={itemDialogOpen}
            hideDialog={this._HideOrderDialog}
            addToCart={this._AddItemToCart}
            selectedItem={selectedItem}
            isThumbsUp={isThumbsUp}
          />}
        <PaymentDialog
          isDialogOpen={showPayment}
          hideDialog={this._HidePayementDialog}
          imgRef={this._imageRef}
        />
      </>
    )
  }

  private _RenderMenuItems(menuItem: IMenuItem, index: number): JSX.Element {
    const { itemDialogOpen } = this.state
    return (
      <MenuItem
        item={menuItem}
        key={index}
        imgRef={this._imageRef}
        index={index}
        updateParentDialogState={this._ChangeItemDialogState}
        connectObserver={itemDialogOpen}
      />
    )
  }

  private _RenderButtonContent(props?: IButtonProps): JSX.Element {
    return (
      <div className="btn-container">
        <span className="emoji">👍</span>
        {props && <span className="text">{props.text}</span>}
      </div>
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

  private _AddItemToCart(item: IMenuItem, quantity: number): void {
    this.setState({ cart: this.state.cart.concat({ item, quantity }), itemDialogOpen: false })
  }

  private _OpenPaymentDialog(): void {
    this.setState({ showPayment: true })
  }

  private _HidePayementDialog(): void {
    this.setState({ showPayment: false })
  }

  private _HideOrderDialog(): void {
    this.setState({ itemDialogOpen: false })
  }

  private _ChangeItemDialogState(value: boolean, selectedItem: IMenuItem): void {
    this.setState({ itemDialogOpen: value, selectedItem })
  }

  private _ThumbsStatusUpdate(status: boolean): void {
    this.setState({ isThumbsUp: status })
  }

  public _MutationHandler(mutations: MutationRecord[]) {
    mutations.forEach((mutation: MutationRecord) => {
      const cursorPos = this._imageRef.current?.getBoundingClientRect();
      const itemPos = document.getElementById("done")?.getBoundingClientRect();

      if (cursorPos && cursorPos.x && cursorPos.y && itemPos) {
        if (
          cursorPos.x >= itemPos!.left && cursorPos.x <= itemPos!.right &&
          cursorPos.y >= itemPos!.top && cursorPos.y <= itemPos!.bottom
        ) {
          if (this._timer === -1) {
            this._timer = (new Date().getTime() / 1000);
          } else if (Math.abs(this._timer - (new Date().getTime() / 1000)) > 2) {
            this._timer = -1
            document.getElementById("done")?.click()
          }
        } else {
          this._timer = -1
        }
      }
    })
  }
}

export default MenuPage;