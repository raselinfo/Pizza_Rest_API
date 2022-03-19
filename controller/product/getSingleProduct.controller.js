import ProductModel from "../../model/product/product.model"
import CustomErrorHandler from "../../service/CustomErrorHandler"
export const getSingleProduct = async (req, res, next) => {
    let { id } = req.params
    // Todo: find the product form the database
    let product
    try {
        product = await ProductModel.findById({ _id: id })
    } catch (err) {
        return next(CustomErrorHandler.notfound("Product Not Found!"))
    }
    // Todo: send the response
    return res.json(product)
}