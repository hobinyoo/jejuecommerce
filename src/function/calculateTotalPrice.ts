export const calculateTotalPrice = (
  quantities: number[],
  delivery: number,
  uid?: string
) => {
  const prices = [12000, 13000, 15000, 18000]
  if (quantities.length !== prices.length) {
    throw new Error('Quantities and prices arrays must have the same length.')
  }

  let totalPrice = 0
  for (let i = 0; i < quantities.length; i++) {
    totalPrice += quantities[i] * prices[i]
  }

  return uid ? (totalPrice + delivery) * 0.9 : totalPrice + delivery
}
