import crypto from "crypto"

const longestIncreasingSubstrings = str => {
	let subStrings = []
	let currentSubString = str[0]
	for (let i = 1; i < str.length; i++) {
		if (str[i] > currentSubString[currentSubString.length - 1]) {
			currentSubString += str[i]
		} else {
			subStrings.push(currentSubString)
			currentSubString = str[i]
		}
	}
	subStrings.push(currentSubString)

	subStrings = subStrings
		.filter(subString => subString.length > 1)
		.map(subString => subString.trim())

	const maxLength = Math.max(...subStrings.map(subString => subString.length))
	return subStrings.filter(subString => subString.length === maxLength)
}

const generateProductCode = (productName, productId) => {
	const name = productName.toLowerCase()
	let subStrings = longestIncreasingSubstrings(name)

	const startPosition = name.indexOf(subStrings[0])
	const endPosition =
		name.lastIndexOf(subStrings[subStrings.length - 1]) +
		subStrings[subStrings.length - 1].length - 1

	subStrings = subStrings.reduce((acc, subString) => {
		acc += subString
		return acc
	}, "")

	const hashProductName = crypto
		.createHmac("sha256", productId)
		.update(productName)
		.digest("hex")
		.slice(0, 8)

	return `${hashProductName}-${startPosition}${subStrings}${endPosition}`
}

export default generateProductCode
