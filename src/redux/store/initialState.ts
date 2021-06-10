export type InitialState = {
  products: {
    productsList: {
      productId: string
      productName: string
      description: string
      url: string
      size: {
        size: string
        price: number
      }[]
    }[]
    toppings: {
      toppingId: string
      toppingName: string
      price: number
    }[]
  }
  users: {
    uid: string | undefined
    isSignedIn: boolean
    username: string | null
    email?: string | undefined | null
    cart: {
      cartId: string
      productId: string
      productName: string
      url: string
      productSize: string
      productPrice: number
      quantity: number
      toppingId: string
      toppingName: string
      toppingPrice: number
    }[]
    orders: {
      orderId: string
      status: number
      destinationName: string
      destinationMail: string
      destinationZipcode: string
      destinationAddress: string
      destinationTel: string
      orderDate: string
      destinationDate: string
      destinationTime: string
      paymentMethod: number
      creditCardNo: string
      productId: string
      productName: string
      url: string
      productSize: string
      quantity: number
      toppingId: string
      toppingName: string
      amount: number
    }[]
  }
}

export type Products = InitialState['products']
export type ProductsList = Products['productsList']
export type ProductsListItem = {
  productId: string
  productName: string
  description: string
  url: string
  size: {
    size: string
    price: number
  }[]
}
export type Toppings = Products['toppings']
export type Topping = {
  toppingId: string
  toppingName: string
  price: number
}

export type Users = InitialState['users']
export type Uid = Users['uid']
export type IsSignedIn = Users['isSignedIn']
export type UserName = Users['username']
export type Email = Users['email']
export type Cart = Users['cart']
export interface CartItem {
  cartId: string
  productId: string
  productName: string
  url: string
  productSize: string
  productPrice: number
  quantity: number
  toppingId: string
  toppingName: string
  toppingPrice: number
}
export type Orders = Users['orders']
export type Order = {
  orderId: string
  status: number
  destinationName: string
  destinationMail: string
  destinationZipcode: string
  destinationAddress: string
  destinationTel: string
  orderDate: string
  destinationDate: string
  destinationTime: string
  paymentMethod: number
  creditCardNo: string
  productId: string
  productName: string
  url: string
  productSize: string
  quantity: number
  toppingId: string
  toppingName: string
  amount: number
}

const initialState: InitialState = {
  products: {
    productsList: [],
    toppings: [],
  },

  users: {
    uid: undefined,
    isSignedIn: false,
    username: '',
    cart: [],
    orders: [],
  },
}

export default initialState
