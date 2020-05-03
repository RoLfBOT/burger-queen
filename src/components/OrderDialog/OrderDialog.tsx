import * as React from 'react'
import { Modal } from '@fluentui/react/lib/Modal'

interface IProps {
  isDialogOpen: boolean
  hideDialog?: (event?: React.MouseEvent<HTMLButtonElement>) => any
}

const OrderDialog: React.FunctionComponent<IProps> = (props: IProps) => {
  const { isDialogOpen, hideDialog } = props
  return (
    <Modal
      isOpen={isDialogOpen}
      onDismiss={hideDialog}
      isBlocking={false}
    >
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eaque veniam ratione eum ipsam nihil provident, in veritatis quae aspernatur quos itaque sint accusantium maxime quas dicta amet asperiores suscipit.
      </div>
    </Modal>
  )
}


export default OrderDialog 