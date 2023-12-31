export const calculateTotalPrice = (quantities: number[], uid?: string) => {
  const prices = [13000, 12000, 18000]
  if (quantities.length !== prices.length) {
    throw new Error('Quantities and prices arrays must have the same length.')
  }

  let totalPrice = 0
  for (let i = 0; i < quantities.length; i++) {
    totalPrice += quantities[i] * prices[i]
  }

  return uid ? totalPrice * 0.95 : totalPrice
}
