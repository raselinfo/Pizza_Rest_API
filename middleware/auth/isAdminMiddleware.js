import CustomErrorHandler from "../../service/CustomErrorHandler"
export const isAdminMiddleware = (req, res, next) => {
    if (!(req.user.role.toLowerCase() === "admin")) {
        return next(CustomErrorHandler.unauthorized("unauthorize! Admin Required"))
    }

    return next()
}