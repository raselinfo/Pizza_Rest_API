import registerRouter from "./auth/registration.routes"
import loginRouter from "./auth/login.routes"
import userRouter from "./user/user.routes"
import refreshRouter from "./refresh/refresh.routes"
import logoutRouter from "./auth/logout.routes"
const routes = [
    {
        path: "/",
        handler: (req, res) => {
            res.send("Hello Home")
        }
    }, {
        path: "/api",
        handler: registerRouter
    }, {
        path: "/api",
        handler: loginRouter
    }, {
        path: "/api",
        handler: userRouter
    }, {
        path: "/api",
        handler: refreshRouter
    }, {
        path: "/api",
        handler: logoutRouter
    }
]

const getAllRoutes = (app) => {
    routes.forEach(({ path, handler }) => {
        if (path === "/") {
            app.get(path, handler)
        } else {
            app.use(path, handler)
        }
    });
}

export default getAllRoutes