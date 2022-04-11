import express from "express"
import mongoose from "mongoose"
import path from "path"
import colors from "colors"
import errorHanddleMiddlewar from "./middleware/errroHandleMiddlewar"
import { APP_PORT, DB_URI } from "./config"
import getAllRoutes from "./routes"
const PORT = APP_PORT || 4000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Todo: Global Path
global.app_root = path.resolve(__dirname)

// Todo: Database Connection
async function db() {
    try {
        const connect = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(colors.inverse(`DB Connected At= ${connect.connection.host}`.brightYellow))
    } catch (err) {
        console.log(`DB Error= ${err.message}`.brightRed)
        process.exit();
    }

} db()

// All App Routes
getAllRoutes(app)
// Public Folder
app.use("/public", express.static("public"))

app.use(errorHanddleMiddlewar)
// App Listen
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

