import UserModel from "../../model/auth/User.model"
import CustomErrorHandler from "../../service/CustomErrorHandler"
export const userController = async (req, res, next) => {
    let user
    // Check if the user exists in the database or not
    try {
        user = await UserModel.findById({ _id: req.user._id }).select("-createdAt -updatedAt -__v")
        if (!user) {
            return next(CustomErrorHandler.notfound())
        }
    } catch (err) {
        return next(err)
    }
    // Send Response
    res.json(user)
}