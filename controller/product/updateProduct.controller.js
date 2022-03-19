import Joi from "joi"
import handeldUpload from "../../util/multer"
export const updateProductController = (req, res, next) => {
   handeldUpload(req,res,async(err)=>{
       let productValidate = Joi.object({
           name: Joi.string(),
           price: Joi.string(),
           size: Joi.string()
       })
       let { error } = productValidate.validate(req.body)
       if (error) {
           return next(error)
       }
       console.log(req.params.id)
   })

}