import { Router } from "express"
import {
	createProductController,
	getProductsController,
	updateProductDetailsController,
} from "../controllers/product.controller.js"
import {
	createProductValidation,
	updateProductValidation,
	validateProduct,
} from "../middlewares/productValidation.middleware.js"

const productRouter = Router()

productRouter.post(
	"/",
	createProductValidation,
	validateProduct,
	createProductController
)
productRouter.get("/", getProductsController)
productRouter.patch(
	"/:id",
	updateProductValidation,
	validateProduct,
	updateProductDetailsController
)

export default productRouter
