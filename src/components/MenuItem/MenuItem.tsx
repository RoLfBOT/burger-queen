import * as React from 'react';

import {
  ItemBox,
  ItemDisplayContainer,
  ItemName,
  ItemDisplayImage
} from './styles';

import OrderDialog from '../OrderDialog'
import { IMenuItem } from '../../utils/DataHelper';

interface IProps {
  item: IMenuItem
  addToCart: (item: IMenuItem) => void
}

interface IState {
  showDialog: boolean
}

class MenuItemComponent extends React.Component<IProps, IState> {

  public state: IState = {
    showDialog: false
  }

  public constructor(props: IProps) {
    super(props)
    this._HideOrderDialog = this._HideOrderDialog.bind(this)
    this._OpenOrderDialog = this._OpenOrderDialog.bind(this)
    this._CloseOrderDialogAndAddToCart = this._CloseOrderDialogAndAddToCart.bind(this)
  }

  public render(): JSX.Element {
    const { item } = this.props
    const { showDialog } = this.state
    return (
      <>
        <ItemBox
          onClick={this._OpenOrderDialog}
        >
          <ItemDisplayContainer>
            <ItemDisplayImage src={item.img} />          
          </ItemDisplayContainer>          
          <ItemName >{item.name}</ItemName>
        </ItemBox>
        <OrderDialog
          isDialogOpen={showDialog}
          hideDialog={this._HideOrderDialog}
          addToCart={this._CloseOrderDialogAndAddToCart}
          selectedItem={item}
        />
      </>
    )
  }

  private _OpenOrderDialog(): void {
    this.setState({ showDialog: true })
  }

  private _HideOrderDialog(): void {
    this.setState({ showDialog: false })
  }

  private _CloseOrderDialogAndAddToCart(): void {
    this.props.addToCart && this.props.addToCart(this.props.item)
    this.setState({ showDialog: false })
  }
}

export default MenuItemComponent;