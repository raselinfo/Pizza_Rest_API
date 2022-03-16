import Joi from "joi"
import RefreshModel from "../../model/auth/RefreshToken.model"
import JWT from "../../service/Jwt"
import UserModel from "../../model/user/User.model"
import CustomErrorHandler from "../../service/CustomErrorHandler"
import Password from "../../util/Password"
import { JWT_REFRESH_SECRET } from "../../config"
export const loginController = async (req, res, next) => {
    let { email, password, confirm_password } = req.body
    // User Data Validation
    const userValidation = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        confirm_password: Joi.string().required()
    })
    const { error } = userValidation.validate(req.body)
    if (error) {
        return next(error)
    }
    // User Password Validation
    if (password !== confirm_password) {
        return next(CustomErrorHandler.wrongCredentials())
    }
    // Check the User in the Database

    let access__token
    let refresh__token
    try {
        let user = await UserModel.findOne({ email: email })
        if (!user) {
            return next(CustomErrorHandler.unauthorized())
        }
        // Match The Password
        let match = await Password.compare(password, user.password)
        if (!match) {
            return next(CustomErrorHandler.unauthorized())
        }
        // Generate Access Token And Refresh Token
        access__token = JWT.sign({ _id: user._id, role: user.role })
        refresh__token = JWT.sign({ _id: user._id, role: user.role }, "1y", JWT_REFRESH_SECRET)

    } catch (err) {
        return next(err)
    }
    // Save Refresh Token in Database
    try {
        await RefreshModel.create({ token: refresh__token })
    } catch (err) {
        return next(err)
    }
    // Send Response
    res.json({ access__token, refresh__token })
}