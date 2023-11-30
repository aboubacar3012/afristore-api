export const getOptionsPrice = (options) => {
  let price = 0;
  options.forEach((option) => {
    option.values.forEach((value) => {
      price += value.price;
    })
  })
  return price;
}