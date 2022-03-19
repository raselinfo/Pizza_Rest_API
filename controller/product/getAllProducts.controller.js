import ProductModel from "../../model/product/product.model"
export const getAllProducts = async (req, res, next) => {
    // Todo: get all products
    let products
    try {
        products = await ProductModel.find()
    } catch (err) {
        return next(err)
    }
    // Todo: response all products
    return res.json({ products })
}