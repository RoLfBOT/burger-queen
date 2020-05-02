import * as React from 'react'

import {
  MainPageWrapper,
  FoodOptions,
  PageHeader
} from './styles'

import data from '../../data.json';
import FoodComponent from './../../components/FoodComponent'
import AppFooter from '../../components/AppFooter';

class MainPage extends React.Component {

  
  public render(): JSX.Element {
    let items = data.Items
    return (
      <MainPageWrapper>
            <PageHeader>Place your Order</PageHeader>
            <FoodOptions>
            {
              items.map((item) => {
                return (<FoodComponent name = {item.Name} src = {item.srcImg}>

                </FoodComponent>)
              })
            }
            </FoodOptions>
            <AppFooter/>
        
      </MainPageWrapper>
    )
  }
}

export default MainPage;