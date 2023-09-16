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
  phoneNumber: string
  postCode: string
  quantity: string
  timestamp: {
    seconds: number
  }
  totalPrice: string
  status: string
  uid: string
  id: string
  carrierCode?: string
  prepareShipping?: boolean
}

export interface CommentProps {
  menu: string
  content: string
  rating: number
  images: string[]
  uid: string
  id: string
  commentTimestamp: {
    seconds: number
  }
}

export interface PayMentsProps {
  email?: string
  menu: string
  quantity: string
  totalPrice: number
  name: string
  phoneNumber: string
  address: string
  addressDetail: string
  postCode: string
  carrierRequest: string
}
