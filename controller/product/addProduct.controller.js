import handeldUpload from "../../util/multer"
export const addProductController = (req, res, next) => {
    handeldUpload(req, res, (err) => {
        if (err) {
            return next(new Error("Server Error"))
        }
        let filePath = req.file.path

        console.log(filePath)
    })
}