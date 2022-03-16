import Joi from "joi"
import { JWT_REFRESH_SECRET } from "../../config"
import RefreshModel from "../../model/auth/RefreshToken.model"
import CustomErrorHandler from "../../service/CustomErrorHandler"
import JWT from "../../service/Jwt"
import UserModel from "../../model/user/User.model"
export const refreshController = async (req, res, next) => {
    // Todo: Validate Token Type
    let refreshValidation = Joi.object({
        token: Joi.string().required()
    })
    let { error } = refreshValidation.validate(req.body)
    if (error) {
        return next(error)
    }
    // Todo: Check if the token exists in the database
    let token
    try {
        token = await RefreshModel.findOne({ token: req.body.token })
        if (!token) {
            return next(CustomErrorHandler.unauthorized("Invalid Refresh Token"))
        }
    } catch (err) {
        return next(CustomErrorHandler.unauthorized("Invalid Refresh Token"))
    }
    // Todo: verify the token
    let userId
    try {
        let { _id } = await JWT.verify(token.token, JWT_REFRESH_SECRET);
        userId = _id
    } catch (err) {
        return next(CustomErrorHandler.unauthorized("Invalid Refresh Token"))
    }
    // Todo: check if the user exists in the database
    let access_token
    let refresh_token
    try {
        let user = await UserModel.findById({ _id: userId })
        if (!user) {
            return next(CustomErrorHandler.notfound("User Not Found"))
        }
        access_token = await JWT.sign({ _id: user.id, role: user.role })
        refresh_token = await JWT.sign({ _id: user.id, role: user.role },"1y",JWT_REFRESH_SECRET)
        
    } catch (err) {
        return next(CustomErrorHandler.notfound("User Not Found"))
    }
}