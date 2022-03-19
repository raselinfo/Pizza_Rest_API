import validate from "../../validator/validator"
import fs from "fs"
import CustomErrorHandler from "../../service/CustomErrorHandler"
import handeldUpload from "../../util/multer"
import ProductModel from "../../model/product/product.model"
export const updateProductController = (req, res, next) => {
    handeldUpload(req, res, async (err) => {
        if (err) {
            return next(err)
        }
        let { id } = req.params
        let { name, price, size } = req.body
        // Todo: file path
        let filePath
        if (req.file) {
            filePath = req.file.path
        }
        // Todo: validate user data
        validate({ data: req.body, filePath }, next)
        // Todo: update the data in the database
        let updatedProduct
        try {
            updatedProduct = await ProductModel.findOneAndUpdate({ _id: id }, {
                name, price, size, ...(req.file && { image: filePath })
            })
            if (!updatedProduct) {
                return next(CustomErrorHandler.notfound("Product doesn't found!"))
            }
            // Todo: delete the image file if already exists in our uploads file
            let existFile = fs.existsSync(`${app_root}/${updatedProduct.image}`)
            if (filePath && existFile) {
                fs.unlink(`${app_root}/${updatedProduct.image}`, (err) => {
                    if (err) {
                        return next(err)
                    }
                })
            }
        } catch (err) {
            return next(CustomErrorHandler.notfound("Product doesn't found!"))
        }
        // Todo: send the response
      return  res.json({ updatedProduct })
    })

}