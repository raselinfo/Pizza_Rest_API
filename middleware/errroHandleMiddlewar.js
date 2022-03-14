import { DEBUG_MODE } from "../config"
import { ValidationError } from "joi"
import CustomErrorHandler from "../service/CustomErrorHandler"
const errorHanddleMiddlewar = (error, req, res, next) => {
    let status = 500
    let errorMessage = {
        message: "Internal Server Error",
        ...(DEBUG_MODE === "true" && { originalError: error.message })
    }
    if (error instanceof ValidationError) {
        status = 422;
        errorMessage = {
            message: error.message
        }
    }
    if (error instanceof CustomErrorHandler) {
        status = error.status,
            errorMessage = {
                message: error.message
            }
    }

    return res.status(status).json(errorMessage)
}

export default errorHanddleMiddlewar