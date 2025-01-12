import mongoose from "mongoose"
import generateProductCode from "../utils/generateProductCode.js"
import { productAvailabilityEnum } from "../constants.js"

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: [true, "Product category is required"],
		},
		description: {
			type: String,
			required: [true, "Product description is required"],
			trim: true,
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
		},
		discount: {
			type: Number,
			range: [0, 100],
			default: 0,
		},
		image: {
			type: String,
			required: [true, "Product image is required"],
		},
		status: {
			type: String,
			enum: productAvailabilityEnum,
			default: "Stock In",
		},
		productCode: {
			type: String,
			unique: [true, "Product code must be unique"],
		},
	},
	{
		timestamps: true,
	}
)

productSchema.pre("save", function (next) {
	if (!this.productCode) {
		this.productCode = generateProductCode(this.name, this._id.toString())
	}
	next()
})

export const Product = mongoose.model("Product", productSchema)
