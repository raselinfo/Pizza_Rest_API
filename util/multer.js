import multer from "multer";
import path from "path"
// Todo: Multer storage setting
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename(rew, file, cb) {
        let uniqueFileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueFileName)
    }
})
// Todo: File type setting
const checkFileType = (file, cb) => {
    const fileType = /jpg|jpeg|png/
    const extname = fileType.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimeType = fileType.test(file.mimeType)
    if (extname && mimeType) {
        return cb(null, true)
    }
    cb(new Error('Only Image Supported!'), false)
}

// Todo: multer upload setting
const handeldUpload = multer({
    storage,
    limits: {
        fileSize: 5e+6 // 5mb
    },
    fileFilter(req, file, cb) {
        checkFileType(file, cb)
    }
})


export default handeldUpload