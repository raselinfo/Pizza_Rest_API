import { model, Schema } from "mongoose"

const tokenSchema = new Schema({
    token: { type: String, required: true, unique: true }
})

let RefreshModel = model("Refresh", tokenSchema, "refreshTokens")

export default RefreshModel