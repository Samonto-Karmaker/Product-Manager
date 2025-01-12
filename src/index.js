import dotenv from "dotenv"
import app from "./app.js"
import setupDB from "./db/setupDB.js"

dotenv.config({
	path: "./.env",
})

const PORT = process.env.PORT || 5000

setupDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	})
	.catch(error => {
		console.log("Server failed to start")
		console.log(error)
	})
