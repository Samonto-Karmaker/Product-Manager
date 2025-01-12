import { Product } from "../models/Product.js"
import { Category } from "../models/Category.js"
import ApiError from "../utils/ApiError.js"
import escape from "../utils/escape.js"
import calculatePrice from "../utils/calculatePrice.js"

const createProduct = async product => {
	try {
		const newProduct = new Product(product)
		await newProduct.save()
		return newProduct
	} catch (error) {
		console.error(error)
		if (error.name === "ValidationError") {
			throw new ApiError(400, error.message)
		}
		throw new ApiError(500, error.message)
	}
}

const getProducts = async (category, name, page = 1, limit = 10) => {
	if (page < 1 || limit < 1 || limit > 20) {
		throw new ApiError(400, "Invalid page or limit value")
	}
	try {
		let CategoryId = null
		if (category && category.trim() !== "") {
			CategoryId = await Category.findOne({ name: category.toLowerCase() })
			if (!CategoryId) {
				throw new ApiError(404, "Category not found")
			}
		}

		// if name or category is not provided, all products should be returned
		const query = {
			...(name && {
				name: { $regex: escape(name), $options: "i" },
			}),
			...(CategoryId && { category: CategoryId._id }),
		}

		const totalProducts = await Product.countDocuments(query)
		let products = await Product.aggregate([
			{
				$match: query,
			},
			{
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",
				},
			},
			{
				$unwind: "$category",
			},
			{
				$project: {
					name: 1,
					category: "$category.name",
					description: 1,
					image: 1,
					status: 1,
					originalPrice: "$price",
					discount: 1,
					productCode: 1,
				},
			},
			{
				$sort: { createdAt: -1 },
			},
			{
				$skip: (page - 1) * limit,
			},
			{
				$limit: limit,
			},
		])

		/* 
            Final price calculation is done separately 
            to keep the price calculation logic separate from the query.
            
            Now even if the price calculation logic changes,
            we only need to update the calculatePrice function.
        */
		products = products.map(product => {
			const finalPrice = calculatePrice(product.originalPrice, product.discount)
			return { ...product, finalPrice }
		})

		return {
			products,
			totalProducts,
			totalPages: Math.ceil(totalProducts / limit),
			currentPage: page,
		}
	} catch (error) {
		console.error(error)
		if (error instanceof ApiError) {
			throw new ApiError(error.code, error.message)
		}
		throw new ApiError(500, "Internal server error")
	}
}

// productDetails = { description, status, discount }
// if any of the fields is not provided, it should not be updated
const updateProductDetails = async (productId, productDetails) => {
	if (!productId) {
		throw new ApiError(400, "Product ID is required")
	}
	if (!productDetails) {
		throw new ApiError(400, "Product details are required")
	}

	const updatedProductDetails = {}
	if (productDetails.description?.trim() !== "") {
		updatedProductDetails.description = productDetails.description
	}
	if (productDetails.status?.trim() !== "") {
		updatedProductDetails.status = productDetails.status
	}
	if (productDetails.discount !== undefined) {
		updatedProductDetails.discount = productDetails.discount
	}

	if (Object.keys(updatedProductDetails).length === 0) {
		throw new ApiError(400, "No fields to update")
	}

	try {
		const product = await Product.findById(productId).select("_id")
		if (!product) {
			throw new ApiError(404, "Product not found")
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			{
				_id: productId,
			},
			{
				$set: updatedProductDetails,
			},
			{
				new: true,
				runValidators: true,
			}
		)
		return updatedProduct
	} catch (error) {
		console.error(error)
		if (error instanceof ApiError) {
			throw new ApiError(error.code, error.message)
		}
		throw new ApiError(500, error.message)
	}
}

export { createProduct, getProducts, updateProductDetails }
