import { APP_URL } from "../../config"
import { model, Schema } from "mongoose"
const productSchema = Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String, required: true },
    image: {
        type: String, required: true, get(image) {
            return `${APP_URL}/${image}`
        }
    }
}, { timestamps: true, toJSON: { getters: true } })

const ProductModel = model("Product", productSchema, 'products')

export default ProductModel


