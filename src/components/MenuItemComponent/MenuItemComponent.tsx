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
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

class MenuItemComponent extends React.Component<IProps, {}> {

  public constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { name, image } = this.props
    return (
        <ItemBox
          onClick={this.props.onClick}
        >
          <ItemDisplayContainer>
            <ItemDisplayImage src={image} />          
          </ItemDisplayContainer>          
          <ItemName >{name}</ItemName>
        </ItemBox>
    )
  }
}

export default MenuItemComponent;