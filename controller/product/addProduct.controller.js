import handeldUpload from "../../util/multer"
export const addProductController = (req, res, next) => {
    handeldUpload(req, res, (err) => {
        if (err) {
            console.log(err)
            return next(err)
        }
        let filePath = req.file.path

        console.log(filePath)
    })
}