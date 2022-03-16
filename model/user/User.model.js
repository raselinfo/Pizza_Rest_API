import { model, Schema } from "mongoose"

const userSchema = new Schema({
    username: { type: String, required: true, maxlength:5,minlength:3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" }
}, { timestamps: true })

const UserModel = model("User", userSchema, "users")
export default UserModel