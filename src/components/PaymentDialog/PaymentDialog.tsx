import * as React from 'react'
import { Modal } from '@fluentui/react/lib/Modal'
import { PrimaryButton, IButtonProps } from '@fluentui/react/lib/Button'

import {
  contentStyles,
  DialogTitle,
  DialogSubHeader,
  ActionBar,
  DangerButtonStyles,
  ImageContainer,
  QRImage
} from './styles'

interface IProps {
  isDialogOpen: boolean
  hideDialog?: () => void
  imgRef: any
}

class PaymentDialog extends React.Component<IProps, {}> {

  private observer = new MutationObserver((mutations) => this.mutationFunc(mutations));  
  private backTimer: number = -1;

  public constructor(props: IProps) {
    super(props);
  }

  public mutationFunc(mutations: MutationRecord[]) {

    mutations.forEach((mutationRecord: MutationRecord) => {
      let cursorPos = this.props.imgRef.current?.getBoundingClientRect();      
      let backPos = document.getElementById('back')?.getBoundingClientRect();      

      if (this.props.isDialogOpen) {
        if (cursorPos && cursorPos.x && cursorPos.y) {
          if (
            backPos && cursorPos.x >= backPos!.left && cursorPos.x <= backPos!.right &&
            cursorPos.y >= backPos!.top && cursorPos.y <= backPos!.bottom
          ) {
            if (this.backTimer === -1) {
              this.backTimer = (new Date().getTime() / 1000);
            }
            else if (Math.abs(this.backTimer - (new Date().getTime() / 1000)) > 3) {
              this.backTimer = -1;
              document.getElementById('back')?.click();
            }
          } else {
            this.backTimer = -1;
          }
        }
      }
    });
  }

  public componentDidMount() {
    const target = this.props.imgRef.current;
    this.observer.observe(target as Node, { attributes: true, attributeFilter: ['style'] });
  }

  public componentWillUnmount(): void {
    this.observer.disconnect()
  }

  public render(): JSX.Element {
    const { isDialogOpen, hideDialog } = this.props;
    return (
      <Modal
        isOpen={isDialogOpen}
        onDismiss={hideDialog}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.body}>
          <DialogTitle>Scan QR code to pay</DialogTitle>          
          <ImageContainer>
            <QRImage src="https://burgerhubstorageaccount.blob.core.windows.net/images/qr.png" alt="QR Code" />
            <DialogSubHeader>$10</DialogSubHeader>
          </ImageContainer>
          <ActionBar>
            <PrimaryButton
              id="back"
              text="Return to Cart"
              styles={DangerButtonStyles}
              onClick={hideDialog}
              onRenderText={this._RenderButtonContent}
            />
          </ActionBar>
        </div>
      </Modal>
    )
  }

  private _RenderButtonContent(props?: IButtonProps): JSX.Element {
    return (
      <div className="btn-container">
        <span className="emoji">👎</span>
        {props && <span className="text">{props.text}</span>}
      </div>
    )
  }
}

export default PaymentDialog 