import Joi from "joi"
import UserModel from "../../model/auth/User.model"
import Password from "../../util/Password"
import CustomErrorHandler from "../../service/CustomErrorHandler"
export const registrationController = async (req, res, next) => {
    const registarSchema = Joi.object({
        username: Joi.string().required().max(5).min(3),
        email: Joi.string().required().pattern(new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$')),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirm_password: Joi.string().required()
    })
    let { error } = registarSchema.validate(req.body)
    if (error) {
        return next(error)
    }
    // 
    try {
        let exists = await UserModel.exists({ email: req.email })
        if (exists) {
            return next(CustomErrorHandler.alreadyExists("User Already Exists"))
        }
    } catch (err) {
        return next(err)
    }
    // let hashedPassword
    try {
        let { password } = await Password.hasPassword(req.body.password)
        hashedPassword = password
    } catch (err) {
        return next(err)
    }


}