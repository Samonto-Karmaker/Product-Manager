import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Category name is required"],
		trim: true,
		lowercase: true,
		unique: [true, "Category name must be unique"],
	},
})

export const Category = mongoose.model("Category", categorySchema)
