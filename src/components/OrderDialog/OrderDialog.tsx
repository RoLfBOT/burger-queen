import * as React from 'react'
import { Modal } from '@fluentui/react/lib/Modal'
import { PrimaryButton, IButtonProps } from '@fluentui/react/lib/Button'

import { IMenuItem } from '../../utils/DataHelper'

import {
  contentStyles,
  DialogTitle,
  DialogSubHeader,
  ActionBar,
  SuccessButtonStyles,
  DangerButtonStyles,
  ImageContainer,
  OrderItemContainer,
  QuantityIndicator
} from './styles'

import { QuantitySpan } from '../CartItem/styles'

interface IProps {
  isDialogOpen: boolean
  hideDialog?: () => void
  addToCart: (item: IMenuItem, quantity: number) => void
  selectedItem: IMenuItem
  isThumbsUp: boolean
}

interface IState {
  quantity: number
}

class OrderDialog extends React.Component<IProps, IState> {
  private gestureTimer: number = -1;
  private _KeyPressRef = React.createRef<HTMLDivElement>()

  public state: IState = {
    quantity: 1
  }

  public constructor(props: IProps) {
    super(props);
    this._AddToCartAndClose = this._AddToCartAndClose.bind(this)
  }

  public componentDidMount(): void {
    setTimeout(() => {
      this.setState({ quantity: 2 })
    }, 2000)
  }

  public componentDidUpdate(): void {
    if (this.props.isDialogOpen) {
      if (this.gestureTimer === -1) {
        this.gestureTimer = (new Date().getTime() / 1000);
      } else {
        if (Math.abs(this.gestureTimer - (new Date().getTime() / 1000)) > 2) {
          if (this.props.isThumbsUp) {
            document.getElementById("accept")?.click();
          } else {
            document.getElementById("remove")?.click();
          }
          this.gestureTimer = -1;
        }
      }
    }
  }

  public render(): JSX.Element {
    const { isDialogOpen, selectedItem } = this.props;
    const { quantity } = this.state

    return (
      <Modal
        isOpen={isDialogOpen}
        onDismiss={this._CloseDialog.bind(this)}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div 
          className={contentStyles.body}
          onKeyDown={this._HandleKeyPress.bind(this)}
          ref={this._KeyPressRef}
        >
          <DialogTitle>Select quantity</DialogTitle>
          <DialogSubHeader>{selectedItem.name} will be added to your cart.</DialogSubHeader>
          <OrderItemContainer>
            <ImageContainer>
              <img src={selectedItem.img} alt="image" />
              {quantity >= 2 &&
                <QuantityIndicator>
                  <QuantitySpan>{quantity}</QuantitySpan>
                </QuantityIndicator>
              }
            </ImageContainer>
          </OrderItemContainer>
          <ActionBar>
            <PrimaryButton
              id="remove"
              text="Remove from cart"
              styles={DangerButtonStyles}
              onClick={this._CloseDialog.bind(this)}
              onRenderText={this._RenderButtonContent}
            />
            <PrimaryButton
              id="accept"
              text="Add to cart"
              styles={SuccessButtonStyles}
              onClick={this._AddToCartAndClose}
              onRenderText={this._RenderButtonContent}
            />
          </ActionBar>
        </div>
      </Modal>
    )
  }

  private _HandleKeyPress(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (parseInt(event.key) >= 1 && parseInt(event.key) <= 5) {
      this.setState({ quantity: parseInt(event.key) })
    }
  }

  private _AddToCartAndClose(): void {
    this.setState({ quantity: 1 })
    this.props.addToCart && this.props.addToCart(this.props.selectedItem, this.state.quantity)
  }

  private _CloseDialog(): void {  
    this.props.hideDialog && this.props.hideDialog()
    this.setState({ quantity: 1 })
  }

  private _RenderButtonContent(props?: IButtonProps): JSX.Element {
    let emoji;
    props?.text === "Add to cart" ?
      emoji = "👍" : emoji = "👎"
    return (
      <div className="btn-container">
        <span className="emoji">{emoji}</span>
        {props && <span className="text">{props.text}</span>}
      </div>
    )
  }
}

export default OrderDialog 