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

  public state: IState = {
    showDialog: false
  }

  public constructor(props: IProps) {
    super(props)
    this._HideOrderDialog = this._HideOrderDialog.bind(this)
    this._OpenOrderDialog = this._OpenOrderDialog.bind(this)
    this._CloseOrderDialogAndAddToCart = this._CloseOrderDialogAndAddToCart.bind(this)
    this.mutationFunc = this.mutationFunc.bind(this);
  }

  private timer = -1;

  public mutationFunc(mutations){

    mutations.forEach((mutationRecord) => {let cursorPos = document.getElementById('cursor_icon')?.getBoundingClientRect();
      let itemPos = document.getElementById('item'+this.props.index)?.getBoundingClientRect();
      if(cursorPos && cursorPos.x && cursorPos.y){		
        if(cursorPos.x >= itemPos!.left && cursorPos.x <= itemPos!.right &&
          cursorPos.y >= itemPos!.top && cursorPos.y <= itemPos!.bottom){
           if(this.timer === -1){
             this.timer = (new Date().getTime() / 1000);
            }
           else if(Math.abs(this.timer - (new Date().getTime() / 1000)) > 3){
            this.timer = -1;
            document.getElementById("item" + this.props.index)?.click();
           }
         } else {
           this.timer = -1;
         }
      }
  });   
  }

  private observer = new MutationObserver((mutations) => this.mutationFunc(mutations));

  public componentDidMount(){
    const target = this.props.imgRef.current;
    this.observer.observe(target as Node, { attributes : true, attributeFilter : ['style'] });

  }

  public render(): JSX.Element {
    
    const { item } = this.props
    const { showDialog } = this.state
    const itemId = 'item' + this.props.index;
    
    return (
      <>
        <ItemBox
          id = {itemId}
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
          imgRef = {this.props.imgRef}
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