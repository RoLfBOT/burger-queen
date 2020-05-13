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
  ImageContainer
} from './styles'

interface IProps {
  isDialogOpen: boolean
  hideDialog?: () => void
  addToCart: (item: IMenuItem) => void
  selectedItem: IMenuItem
  isThumbsUp: boolean
}

class OrderDialog extends React.Component<IProps, {}> {
  private gestureTimer: number = -1;

  public constructor(props: IProps) {
    super(props);    
    this._AddToCartAndClose = this._AddToCartAndClose.bind(this)
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
    const { isDialogOpen, hideDialog, selectedItem } = this.props;

    return (
      <Modal
        isOpen={isDialogOpen}
        onDismiss={hideDialog}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.body}>
          <DialogTitle>Select quantity</DialogTitle>
          <DialogSubHeader>{selectedItem.name} will be added to your cart.</DialogSubHeader>
          <ImageContainer>
            <img src={selectedItem.img} alt="image" />
          </ImageContainer>
          <ActionBar>
            <PrimaryButton
              id="remove"
              text="Remove from cart"
              styles={DangerButtonStyles}
              onClick={hideDialog}
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

  private _AddToCartAndClose(): void {
    this.props.addToCart && this.props.addToCart(this.props.selectedItem)
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