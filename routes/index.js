import registerRouter from "./auth/registration.routes"
import loginRouter from "./auth/login.routes"
import userRouter from "./user/user.routes"
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
    },, {
        path: "/api",
        handler: userRouter
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