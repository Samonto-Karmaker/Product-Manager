const calculatePrice = (price, discount) => {
    const discountPrice = price - price * (discount / 100)
    return discountPrice
}

export default calculatePrice