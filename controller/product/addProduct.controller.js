import validate from "../../validator/validator"
import ProductModel from "../../model/product/product.model"
import handeldUpload from "../../util/multer"
export const addProductController = (req, res, next) => {
    handeldUpload(req, res, async (err) => {
        let { name, price, size } = req.body
        if (err) {
            return next(err)
        }
        //  Todo: check if file property exists in req object
        if (!(req.hasOwnProperty('file'))) {
            return next(new Error("Please Upload an Image"))
        }
        let filePath = req.file.path
        // Todo: validate the body data
        validate({data:req.body,filePath},next)
        // Todo: Save the image path in the database
        let product
        try {
            product = await ProductModel.create({
                name,
                price,
                size,
                image: filePath
            })
        } catch (err) {
            return next(error)
        }
        // Todo: Send Response
        res.json(product)
    })
}