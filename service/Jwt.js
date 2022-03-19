import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config"
class JWT {
    static sign(payload, expiry = "1y", secret = JWT_ACCESS_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }
    static verify(token, secret = JWT_ACCESS_SECRET) {
        return jwt.verify(token, secret)
    }
}

export default JWT