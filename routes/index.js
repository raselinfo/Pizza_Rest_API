import registerRouter from "./auth/registration.routes"
import loginRouter from "./auth/login.routes"
import userRouter from "./user/user.routes"
import refreshRouter from "./refresh/refresh.routes"
import logoutRouter from "./auth/logout.routes"
import productRouter from "./product/product.routes"

// Todo: Make Routes
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
    }, {
        path: "/api",
        handler: productRouter
    }
]
// Todo: initialize all routes for our server
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