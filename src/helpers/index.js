function pricePropertyFormat(price) {
  return Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export { pricePropertyFormat }