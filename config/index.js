import dotenv from "dotenv"
dotenv.config()

export const { APP_PORT, DB_URI, DEBUG_MODE, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET}=process.env

