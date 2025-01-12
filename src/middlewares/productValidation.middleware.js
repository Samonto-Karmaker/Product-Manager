import { check, validationResult } from "express-validator"
import ApiError from "../utils/ApiError.js"
import { Category } from "../models/Category.js"
import { productAvailabilityEnum } from "../constants.js"

const nameValidator = check("name")
	.trim()
	.notEmpty()
	.withMessage("Product name is required")
	.isLength({ min: 1, max: 255 })
	.withMessage("Product name must be between 1 and 255 characters")

const categoryValidator = check("category")
	.notEmpty()
	.withMessage("Product category is required")
	.isMongoId()
	.withMessage("Product category must be a valid MongoDB ID")
	.custom(async id => {
		try {
			const category = await Category.findById(id)
			if (!category) {
				throw new ApiError(404, "Category not found")
			}
		} catch (error) {
			throw new ApiError(500, error.message)
		}
	})

const descriptionValidatorForCreate = check("description")
	.trim()
	.notEmpty()
	.withMessage("Product description is required")
	.isLength({ min: 10, max: 1000 })
	.withMessage("Product description must be between 10 and 1000 characters")

const descriptionValidatorForUpdate = check("description")
	.optional()
	.trim()
	.isLength({ min: 10, max: 1000 })
	.withMessage("Product description must be between 10 and 1000 characters")

const priceValidator = check("price")
	.notEmpty()
	.withMessage("Product price is required")
	.isFloat({ min: 0 })
	.withMessage("Product price must be a positive number")

const discountValidator = check("discount")
	.optional()
	.isFloat({ min: 0, max: 100 })
	.withMessage("Product discount must be a number between 0 and 100")

const imageValidator = check("image")
	.notEmpty()
	.withMessage("Product image is required")
	.isURL()
	.withMessage("Product image must be a valid URL")

const statusValidator = check("status")
	.isIn([productAvailabilityEnum.stockIn, productAvailabilityEnum.stockOut])
	.withMessage(
		`Product status must be one of: ${productAvailabilityEnum.stockIn}, ${productAvailabilityEnum.stockOut}`
	)

export const createProductValidation = [
	nameValidator,
	categoryValidator,
	descriptionValidatorForCreate,
	priceValidator,
	discountValidator,
	imageValidator,
	statusValidator,
]

export const updateProductValidation = [
	descriptionValidatorForUpdate,
	statusValidator.optional(),
	discountValidator.optional(),
]

export const validateProduct = (req, res, next) => {
	const errors = validationResult(req)
	const mappedErrors = errors.mapped()
	if (Object.keys(mappedErrors).length === 0) {
		return next()
	}
	res.status(400).json(new ApiError(400, "Validation failed", mappedErrors))
}
