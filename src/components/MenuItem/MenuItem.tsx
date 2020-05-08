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
  imgRef: any
  index: number
}

interface IState {
  showDialog: boolean
}


class MenuItemComponent extends React.Component<IProps, IState> {

  private _ItemRef = React.createRef<HTMLDivElement>()
  private timer: number = -1;
  private observer = new MutationObserver((mutations: MutationRecord[]) => this._MutationHandler(mutations));

  public state: IState = {
    showDialog: false
  }

  public constructor(props: IProps) {
    super(props)
    this._HideOrderDialog = this._HideOrderDialog.bind(this)
    this._OpenOrderDialog = this._OpenOrderDialog.bind(this)
    this._CloseOrderDialogAndAddToCart = this._CloseOrderDialogAndAddToCart.bind(this)
    this._MutationHandler = this._MutationHandler.bind(this);
  }

  public _MutationHandler(mutations: MutationRecord[]) {

    mutations.forEach((mutationRecord: MutationRecord) => {
      const cursorPos = this.props.imgRef.current?.getBoundingClientRect();
      const itemPos = this._ItemRef.current?.getBoundingClientRect();

      if (cursorPos && cursorPos.x && cursorPos.y) {
        if (
          cursorPos.x >= itemPos!.left && cursorPos.x <= itemPos!.right &&
          cursorPos.y >= itemPos!.top && cursorPos.y <= itemPos!.bottom
        ) {
          if (this.timer === -1) {
            this.timer = (new Date().getTime() / 1000);
          }
          else if (Math.abs(this.timer - (new Date().getTime() / 1000)) > 3) {
            this.timer = -1;                   
            this._ItemRef.current && this._ItemRef.current.click();
          }
        } else {
          this.timer = -1;
        }
      }
    });
  }  

  public componentDidMount(): void {
    const target = this.props.imgRef.current;
    this.observer.observe(target as Node, { attributes: true, attributeFilter: ['style'] });

  }

  public componentWillUnmount(): void {
    this.observer.disconnect()
  }

  public render(): JSX.Element {

    const { item, index } = this.props
    const { showDialog } = this.state
    const itemId = 'item' + index;

    return (
      <>
        <ItemBox
          id={itemId}
          onClick={this._OpenOrderDialog}
          ref={this._ItemRef}
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
          imgRef={this.props.imgRef}
        />
      </>
    )
  }

  private _OpenOrderDialog(): void {
    this.setState({ showDialog: true })
    this.observer.disconnect()
  }

  private _HideOrderDialog(): void {
    this.setState({ showDialog: false })
    const target = this.props.imgRef.current;
    this.observer.observe(target as Node, { attributes: true, attributeFilter: ['style'] });
  }

  private _CloseOrderDialogAndAddToCart(): void {
    this.props.addToCart && this.props.addToCart(this.props.item)
    this.setState({ showDialog: false })
  }
}

export default MenuItemComponent;