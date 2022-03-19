import CustomErrorHandler from "../../service/CustomErrorHandler"
import UserModel from "../../model/user/User.model"
export const isAdminMiddleware = async (req, res, next) => {
    let { _id } = req.user
    // Todo: check if the user exists in the database
    let user
    try {
        user = await UserModel.findById({ _id: _id })
        if (!user) {
            return next(CustomErrorHandler.notfound("User Not Found"))
        }
    } catch (err) {
        return next(err)
    }
    // Todo: check if the request come from admin
    if (user.role.toLowerCase() !== "admin") {
        return next(CustomErrorHandler.unauthorized("unauthorize! Admin Required"))
    }
    return next()
}