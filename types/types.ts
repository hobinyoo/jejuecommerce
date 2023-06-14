export type UsersProps = {
  id: string
  name: string
  phoneNumber: string
  address?: string
  addressDetail?: string
  postCode?: string
}

export type OrderProps = {
  address: string
  addressDetail: string
  menu: string
  name: string
  phoneNumber: string
  postCode: string
  quantity: string
  timestamp: Date
  totalPrice: string
  status: string
  uid: string
  id: string
}
