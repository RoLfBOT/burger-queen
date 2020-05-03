import * as React from 'react'

import {
  CartItemContainer
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
    const { name, quantity } = this.props
    return (
      <CartItemContainer>
        {name + quantity}
      </CartItemContainer>
    )
  }
}

export default CartItemComponent;