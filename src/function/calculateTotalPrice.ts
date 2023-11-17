export const calculateTotalPrice = (
  quantities: number[],
  delivery?: number
) => {
  const prices = [12000, 13000, 15000, 18000]
  if (quantities.length !== prices.length) {
    throw new Error('Quantities and prices arrays must have the same length.')
  }

  let totalPrice = 0
  for (let i = 0; i < quantities.length; i++) {
    totalPrice += quantities[i] * prices[i]
  }

  if (delivery) {
    return totalPrice + delivery
  } else {
    return totalPrice
  }
}
