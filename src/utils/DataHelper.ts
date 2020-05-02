const MenuData = {
  Items: [
    {
      name: "Supreme Burger",
      img: "https://burgerhubstorageaccount.blob.core.windows.net/images/246-2462774_mcdonalds-burger-png-new-zealand-kiwi-burger-transparent.png"
    },
    {
      name: "XL Burger",
      img: "https://burgerhubstorageaccount.blob.core.windows.net/images/mcdonalds-burger-png-12%20(1).png"
    },
    {
      name: "XL Burger (Veg)",
      img: "https://burgerhubstorageaccount.blob.core.windows.net/images/mcdonalds-burger-png-12%20(1).png"
    },
    {
      name: "Combo Pack",
      img: "https://burgerhubstorageaccount.blob.core.windows.net/images/unnamed%201.png"
    }
  ]
}

export interface IMenuItem {
  name: string
  img: string
}

export interface IMenu {
  Items: IMenuItem []
}

export default MenuData