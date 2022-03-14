import bcrypt from "bcrypt"

class Password {
    constructor(password) {
        this.password = password
    }

    static async hasPassword(password) {
        try {
            let hasPassword = await bcrypt.hash(password, 10)
            return new Password(hasPassword)
        } catch (err) {
            console.log("Error", err.message)
        }
    }

    static async compare(requestedPassword, userPassword) {
        try {
            let match = await bcrypt.compare(requestedPassword, userPassword)
            return match
        } catch (err) {
            console.log("Error", err.message)
        }
    }
}

export default Password