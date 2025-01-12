import express from "express"
import cors from "cors"
import { BASE_URL } from "./constants.js"
import productRouter from "./routers/product.router.js"
import healthCheckRouter from "./routers/healthCheck.router.js"

const app = express()
app.use(cors())

app.use(
	express.json({
		limit: "50mb",
	})
)
app.use(
	express.urlencoded({
		limit: "50mb",
		extended: true,
	})
)

app.use(`${BASE_URL}/products`, productRouter)
app.use(`${BASE_URL}/health-check`, healthCheckRouter)

export default app
