import fs from 'fs'
import Joi from "joi"

const validate = ({ data, filePath},next)=>{
    let productValidate = Joi.object({
        name: Joi.string().required(),
        price: Joi.string().required(),
        size: Joi.string().required(),
        image: Joi.string()
    })
    let { error } = productValidate.validate(data)
    // Todo: Delete the file if Error
    if (error) {
        fs.unlink(`${app_root}/${filePath}`, (err) => {
            if (err) {
                return next(err)
            }
        })
        return next(error)
    }
}
export default validate