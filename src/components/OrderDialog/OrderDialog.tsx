import * as React from 'react'
import { Modal } from '@fluentui/react/lib/Modal'
import { PrimaryButton } from '@fluentui/react/lib/Button'

import { IMenuItem } from '../../utils/DataHelper'

import { 
  contentStyles ,
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
}

const OrderDialog: React.FunctionComponent<IProps> = (props: IProps) => {
  const { isDialogOpen, hideDialog, addToCart, selectedItem } = props
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
          <img src= {selectedItem.img} alt="image"/>
        </ImageContainer>
        <ActionBar>
          <PrimaryButton 
            text="Remove from cart"
            styles={DangerButtonStyles}
            onClick={hideDialog}
          />
          <PrimaryButton 
            text="Add to cart"
            styles={SuccessButtonStyles}
            onClick={addToCart}
          />
        </ActionBar>
      </div>
    </Modal>
  )
}


export default OrderDialog 