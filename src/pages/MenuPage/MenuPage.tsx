import * as React from 'react'

import {
  MenuPageContainer,
  MenuCardDiv,
  PageHeader
} from './styles'

import MenuData, { IMenu, IMenuItem } from '../../utils/DataHelper';
import MenuItemComponent from '../../components/MenuItemComponent'

class MenuPage extends React.Component {

  public render(): JSX.Element {
    const { Items } = MenuData as IMenu;
    return (
      <MenuPageContainer>
        <PageHeader>Place your Order</PageHeader>
        <MenuCardDiv id="menu-items">
          {Items.map(this._RenderMenuItems)}
        </MenuCardDiv>
      </MenuPageContainer>
    )
  }

  private _RenderMenuItems(menuItem: IMenuItem, index: number): JSX.Element {
    return (
      <MenuItemComponent
        name={menuItem.name}
        image={menuItem.img}
        key={index}
      />
    )
  }
}

export default MenuPage;