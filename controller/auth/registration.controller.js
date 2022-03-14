import Joi from "joi"
import JWT from "../../service/Jwt"
import UserModel from "../../model/auth/User.model"
import Password from "../../util/Password"
import CustomErrorHandler from "../../service/CustomErrorHandler"
import { JWT_REFRESH_SECRET } from "../../config"
import RefreshModel from "../../model/auth/RefreshToken.model"
export const registrationController = async (req, res, next) => {
    // User Data Validation
    const registarSchema = Joi.object({
        username: Joi.string().required().max(5).min(3),
        email: Joi.string().required().pattern(new RegExp('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$')),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    let { error } = registarSchema.validate(req.body)
    if (error) {
        return next(error)
    }
    let { username, email } = req.body
    // Check,Is the user already Exists or Not
    try {
        let exists = await UserModel.exists({ email: email })
        if (exists) {
            return next(CustomErrorHandler.alreadyExists("User Already Exists"))
        }
    } catch (err) {
        return next(err)
    }
    // Hashed Password
    let hashedPassword
    try {
        let { password } = await Password.hasPassword(req.body.password)
        hashedPassword = password
    } catch (err) {
        return next(err)
    }

    let access_token
    let refresh_token
    let user
    // Save the User On Database
    try {
        let new_user = new UserModel({
            username,
            email,
            password: hashedPassword
        })
        if (new_user) {
            user = await new_user.save()
        }
    } catch (err) {
        return next(err)
    }
    // Generate Access and Refresh Token
    try {
        access_token = await JWT.sign({ _id: user._id, role: user.role })
        refresh_token = await JWT.sign({ _id: user._id, role: user.role }, "1y", JWT_REFRESH_SECRET)
        try {
            await RefreshModel.create({ token: refresh_token })

        } catch (err) {
            return next(err)
        }
    } catch (err) {
        return next(err)
    }
    // Send Response
    res.json({
        access_token, refresh_token
    })
}