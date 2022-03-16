import Joi from "joi"
export const logoutController=(req,res,next)=>{
    let tokenValidation=Joi.object({
        token:Joi.string().required()
    })

    let {}
}