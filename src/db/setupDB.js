import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

export default async function setupDB() {
	try {
		await mongoose.connect(
			`${process.env.MONGODB_CONNECTION_STRING}/${DB_NAME}`
		)
		console.log("MongoDB connection successful")
	} catch (error) {
		console.log("MongoDB connection failed", error)
		process.exit(1)
	}
}
