import ApiResponse from "../utils/ApiResponse.js"
import {
	createProduct,
	getProducts,
	updateProductDetails,
} from "../services/product.service.js"

const createProductController = async (req, res) => {
	try {
		const product = req.body
		const newProduct = await createProduct(product)
		res
			.status(201)
			.json(new ApiResponse(201, "Product created successfully", newProduct))
	} catch (error) {
		res
			.status(error.code || 500)
			.json(new ApiResponse(error.code, error.message))
	}
}

const getProductsController = async (req, res) => {
	try {
		let { category, name, page, limit } = req.query
		page = parseInt(page) || 1
		limit = parseInt(limit) || 10
		const products = await getProducts(category, name, page, limit)
		res
			.status(200)
			.json(new ApiResponse(200, "Products retrieved successfully", products))
	} catch (error) {
		res
			.status(error.code || 500)
			.json(new ApiResponse(error.code, error.message))
	}
}

const updateProductDetailsController = async (req, res) => {
	try {
		const { id } = req.params
		const updatedProductDetails = req.body
		const updatedProduct = await updateProductDetails(id, updatedProductDetails)
		res
			.status(200)
			.json(
				new ApiResponse(
					200,
					"Product details updated successfully",
					updatedProduct
				)
			)
	} catch (error) {
		res
			.status(error.code || 500)
			.json(new ApiResponse(error.code, error.message))
	}
}

export {
	createProductController,
	getProductsController,
	updateProductDetailsController,
}
