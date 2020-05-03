import * as React from 'react'

import {
  CartItemContainer,
  ItemDisplayImg,
  QuantityIndicator,
  QuantitySpan
} from './styles'

interface IProps {
  name: string
  image: string
  quantity: number
}

class CartItemComponent extends React.Component<IProps, {}> {

  public constructor(props: IProps) {
    super(props)
  }

  public render(): JSX.Element {
    const { image, quantity } = this.props
    return (
      <CartItemContainer>
        <ItemDisplayImg src={image} />
        <QuantityIndicator>
          <QuantitySpan>{quantity}</QuantitySpan>
        </QuantityIndicator>
      </CartItemContainer>
    )
  }
}

export default CartItemComponent;