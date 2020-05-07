import * as React from 'react'
import { Modal } from '@fluentui/react/lib/Modal'
import { PrimaryButton } from '@fluentui/react/lib/Button'

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
  addToCart: () => void
  selectedItem: IMenuItem
  imgRef: any
}

class OrderDialog extends React.Component<IProps, {}> {

  private observer = new MutationObserver((mutations) => this.mutationFunc(mutations));
  private acceptTimer: number = -1;
  private removeTimer: number = -1;

  public constructor(props: IProps) {
    super(props);
  }

  public mutationFunc(mutations: MutationRecord[]) {

    mutations.forEach((mutationRecord: MutationRecord) => {
      let cursorPos = this.props.imgRef.current?.getBoundingClientRect();      
      let removePos = document.getElementById('remove')?.getBoundingClientRect();
      let acceptPos = document.getElementById('accept')?.getBoundingClientRect();

      if (this.props.isDialogOpen) {
        if (cursorPos && cursorPos.x && cursorPos.y) {
          if (
            removePos && cursorPos.x >= removePos!.left && cursorPos.x <= removePos!.right &&
            cursorPos.y >= removePos!.top && cursorPos.y <= removePos!.bottom
          ) {
            if (this.removeTimer === -1) {
              this.removeTimer = (new Date().getTime() / 1000);
            }
            else if (Math.abs(this.removeTimer - (new Date().getTime() / 1000)) > 3) {
              this.removeTimer = -1;
              document.getElementById("remove")?.click();
            }
          } else {
            this.removeTimer = -1;
          }
        }

        if (cursorPos && cursorPos.x && cursorPos.y) {
          if (
            acceptPos && cursorPos.x >= acceptPos!.left && cursorPos.x <= acceptPos!.right &&
            cursorPos.y >= acceptPos!.top && cursorPos.y <= acceptPos!.bottom
          ) {
            if (this.acceptTimer === -1) {
              this.acceptTimer = (new Date().getTime() / 1000);
            }
            else if (Math.abs(this.acceptTimer - (new Date().getTime() / 1000)) > 3) {
              this.acceptTimer = -1;
              document.getElementById("accept")?.click();
            }
          } else {
            this.acceptTimer = -1;
          }
        }
      }
    });
  }

  public componentDidMount() {
    const target = this.props.imgRef.current;
    this.observer.observe(target as Node, { attributes: true, attributeFilter: ['style'] });
  }

  public render(): JSX.Element {
    const { isDialogOpen, hideDialog, addToCart, selectedItem } = this.props;
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
            />
            <PrimaryButton
              id="accept"
              text="Add to cart"
              styles={SuccessButtonStyles}
              onClick={addToCart}
            />
          </ActionBar>
        </div>
      </Modal>
    )
  }
}

export default OrderDialog 