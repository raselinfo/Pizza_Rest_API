import Joi from "joi"
import { JWT_REFRESH_SECRET } from "../../config"
import RefreshModel from "../../model/auth/RefreshToken.model"
import CustomErrorHandler from "../../service/CustomErrorHandler"
import JWT from "../../service/Jwt"
export const logoutController = async (req, res, next) => {
    // Todo: token validation
    let tokenValidation = Joi.object({
        token: Joi.string().required()
    })
    let { error } = tokenValidation.validate(req.body)
    if (error) {
        return next(error)
    }
    // Todo: verify the token
    try {
        await JWT.verify(req.body.token, JWT_REFRESH_SECRET)
    } catch (err) {
        return next(CustomErrorHandler.unauthorized("Invalid Token"))
    }
    // Todo: delete the token form the database
    let deletedToken
    try {
        deletedToken = await RefreshModel.findOneAndDelete({ token: req.body.token })
        if (!deletedToken) {
            return next(CustomErrorHandler.unauthorized())
        }
    } catch (err) {
        return next(err)
    }

    // Todo: send the response
    return res.json({ status: 1 })

}