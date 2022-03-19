import UserModel from "../../model/user/User.model"
import CustomErrorHandler from "../../service/CustomErrorHandler"
export const isUserMiddleware = async (req, res, next) => {
    let { _id } = req.user
    // Todo: check if your exists in the database
    try {
        let user = await UserModel.findById({ _id: _id })
        if (user) {
            return next()
        }
    } catch (err) {
        return next(CustomErrorHandler.notfound("User Not Found"))
    }
}