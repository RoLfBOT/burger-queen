import * as React from 'react';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator'

import {
  ItemBox,
  ItemDisplayContainer,
  ItemName,
  ItemDisplayImage,
  ProgressStyle
} from './styles';

import OrderDialog from '../OrderDialog'
import { IMenuItem } from '../../utils/DataHelper';

interface IProps {
  item: IMenuItem
  addToCart: (item: IMenuItem) => void
  imgRef: any
  index: number
  updateParentDialogState: (value: boolean) => void
  connectObserver: boolean
  isThumbsUp: boolean
}

interface IState {
  showDialog: boolean
  timeToClick: number
}

const INTERVAL_DELAY = 300;
const INTERVAL_INCREMENT = 0.1;


class MenuItemComponent extends React.Component<IProps, IState> {

  private _ItemRef = React.createRef<HTMLDivElement>()
  private timer: number = -1
  private observer = new MutationObserver((mutations: MutationRecord[]) => this._MutationHandler(mutations))
  private _Interval: NodeJS.Timeout | null

  public state: IState = {
    showDialog: false,
    timeToClick: 0
  }

  public constructor(props: IProps) {
    super(props)
    this._HideOrderDialog = this._HideOrderDialog.bind(this)
    this._OpenOrderDialog = this._OpenOrderDialog.bind(this)
    this._CloseOrderDialogAndAddToCart = this._CloseOrderDialogAndAddToCart.bind(this)
    this._MutationHandler = this._MutationHandler.bind(this);
    this._Interval = null
  }

  public componentDidMount(): void {
    const target = this.props.imgRef.current;
    this.observer.observe(target as Node, { attributes: true, attributeFilter: ['style'] });
  }

  public componentDidUpdate(): void {
    const { connectObserver } = this.props
    if (connectObserver) {
      this.observer.disconnect()
    } else {
      const target = this.props.imgRef.current;
      this.observer.observe(target as Node, { attributes: true, attributeFilter: ['style'] });
    }
  }

  public componentWillUnmount(): void {
    this.observer.disconnect()
    this._Interval = null
  }

  public render(): JSX.Element {

    const { item, index } = this.props
    const { showDialog, timeToClick } = this.state
    const itemId = 'item' + index;

    return (
      <>
        <ItemBox
          id={itemId}
          onClick={this._OpenOrderDialog}
          ref={this._ItemRef}
        >
          <ItemDisplayContainer id="item-image">
            <ItemDisplayImage src={item.img} />
          </ItemDisplayContainer>
          <ProgressIndicator
            percentComplete={timeToClick}
            styles={ProgressStyle}
          />
          <ItemName >{item.name}</ItemName>
        </ItemBox>
        <OrderDialog
          isDialogOpen={showDialog}
          hideDialog={this._HideOrderDialog}
          addToCart={this._CloseOrderDialogAndAddToCart}
          selectedItem={item}
          imgRef={this.props.imgRef}
          isThumbsUp={this.props.isThumbsUp}
        />
      </>
    )
  }

  private _OpenOrderDialog(): void {
    this.setState({ showDialog: true })
    this.props.updateParentDialogState(true)
  }

  private _HideOrderDialog(): void {
    this.setState({ showDialog: false })
    this.props.updateParentDialogState(false)
  }

  private _CloseOrderDialogAndAddToCart(): void {
    this.props.addToCart && this.props.addToCart(this.props.item)
    this.setState({ showDialog: false })
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
            const itemImage = this._ItemRef.current?.querySelector('#item-image') as HTMLDivElement;
            if (itemImage) itemImage.style.backgroundColor = "#FFEF9C";

            this._Interval = setInterval(() => {
              let percentComplete = this.state.timeToClick + INTERVAL_INCREMENT
              if (percentComplete >= 1.0) {
                console.log('complete')
                percentComplete = 0
                this.setState({ timeToClick: 0 })
                clearInterval(this._Interval as NodeJS.Timeout)
              }

              if (this.timer === -1) {
                console.log('timer 0')
                percentComplete = 0
                this.setState({ timeToClick: 0 })
                clearInterval(this._Interval as NodeJS.Timeout)
              }

              this.setState({ timeToClick: percentComplete })
            }, INTERVAL_DELAY)            
          }
          else if (Math.abs(this.timer - (new Date().getTime() / 1000)) > 3) {
            this.timer = -1;
            const itemImage = this._ItemRef.current?.querySelector('#item-image') as HTMLDivElement;
            if (itemImage) itemImage.style.backgroundColor = "#F7F7F7";
            clearInterval(this._Interval as NodeJS.Timeout)
            this._ItemRef.current && this._ItemRef.current.click();            
          }
        } else {
          this.timer = -1;
          const itemImage = this._ItemRef.current?.querySelector('#item-image') as HTMLDivElement;
          if (itemImage) itemImage.style.backgroundColor = "#F7F7F7";
          this.setState({ timeToClick: 0 })          
        }
      }
    });
  }
}

export default MenuItemComponent;