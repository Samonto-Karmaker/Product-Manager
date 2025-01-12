import ApiResponse from "../utils/ApiResponse.js"

const healthCheckController = async (req, res) => {
	res.status(200).json(new ApiResponse(200, "Server is up and running"))
}

export { healthCheckController }
