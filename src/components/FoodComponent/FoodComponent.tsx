import * as React from 'react';

import {
  FoodItemBox,
  FoodImage,
  ImageContainer,
  FoodNameText
} from './styles';


interface foodProps {
  name?: string;
  src?: string;
}

class FoodComponent extends React.Component <foodProps> {

  public constructor(props:foodProps){
    super(props);
  }

  public render(): JSX.Element {
    return (
        <FoodItemBox>
          <ImageContainer>
            <FoodImage src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/RedDot_Burger.jpg">

            </FoodImage>

          </ImageContainer>
          
          <FoodNameText >{this.props.name}</FoodNameText>
        </FoodItemBox>
    )
  }
}

export default FoodComponent;