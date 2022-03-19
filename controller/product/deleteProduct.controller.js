import fs from 'fs'
import ProductModel from "../../model/product/product.model"
import CustomErrorHandler from "../../service/CustomErrorHandler"
export const deleteProductController = async (req, res, next) => {
    let { id } = req.params
    // Todo: delete the product from the database
    try {
        let product = await ProductModel.findOneAndDelete({ _id: id })
        if (!product) {
            return next(CustomErrorHandler.notfound("Product Not Found!"))
        }
        // Todo: delete the image from the upload folder
        let isExistsImage = fs.existsSync(`${app_root}/${product._doc.image}`)
        if (isExistsImage) {
            console.log("deleted")
            fs.unlink(`${app_root}/${product._doc.image}`, (err) => {
                if (err) {
                    return next(err)
                }
            })
        }

    } catch (err) {
        return next(err)
    }

    // Todo: send the response
    return res.status(200).json({ message: 1 })
}