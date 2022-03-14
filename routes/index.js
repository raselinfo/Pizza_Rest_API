import registerRouter from "./auth/registration.routes"
const routes = [
    {
        path: "/",
        handler: (req, res) => {
            res.send("Hello Home")
        }
    }, {
        path: "/api",
        handler: registerRouter
    },
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