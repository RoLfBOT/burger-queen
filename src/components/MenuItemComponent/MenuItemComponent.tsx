import * as React from 'react';

import {
  ItemBox,
  ItemDisplayContainer,
  ItemName,
  ItemDisplayImage
} from './styles';


interface IProps {
  name: string;
  image: string;
}

class FoodComponent extends React.Component<IProps, {}> {

  public constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { name, image } = this.props
    return (
        <ItemBox>
          <ItemDisplayContainer>
            <ItemDisplayImage src={image} />          
          </ItemDisplayContainer>          
          <ItemName >{name}</ItemName>
        </ItemBox>
    )
  }
}

export default FoodComponent;