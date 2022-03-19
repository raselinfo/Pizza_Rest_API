import CustomErrorHandler from "../../service/CustomErrorHandler"
import JWT from "../../service/Jwt"
export const authMiddleware = async (req, res, next) => {
    let { authorization } = req.headers
    if (!Boolean(authorization)) {
        return next(CustomErrorHandler.unauthorized())
    }
    authorization = authorization.split(" ")[1]
    try {
        let { _id, role } = await JWT.verify(authorization)
        req.user = {
            _id,
            role
        }
        next()
    } catch (err) {
        return next(CustomErrorHandler.unauthorized())
    }
}