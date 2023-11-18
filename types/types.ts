export interface UsersProps {
  id: string
  name?: string
  email?: string
  phoneNumber: string
  address?: string
  addressDetail?: string
  postCode?: string
}

export interface OrderProps {
  address: string
  addressDetail: string
  menu: string
  name: string
  carrierRequest?: string
  method?: string
  phoneNumber: string
  postCode: string
  quantity: number[]
  timestamp: string
  totalPrice: string
  status: string
  uid?: string
  id: string
  carrierCode?: string
  prepareShipping?: boolean
  receipt?: string
  content?: string
}

export interface CommentProps {
  menu: string
  content: string
  rating: number
  images: string[]
  uid: string
  id: string
  commentTimestamp: string
}

export interface PayMentsProps {
  uid?: string
  email?: string
  quantity: number[]
  totalPrice: number
  name: string
  phoneNumber: string
  address: string
  addressDetail: string
  postCode: string
  carrierRequest: string
}
