const multer = require('multer');
const path = require('path');

const storageImgProduct = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/products')
    },
    filename : function (req,file,callback){
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});

const storageImgUser = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/users')
    },
    filename : function (req,file,callback){
        callback(null, `${Date.now()}_users_${path.extname(file.originalname)}`)
    }
})

const uploadImgProduct = multer({
    storage : storageImgProduct
})

const uploadImgUser = multer({
    storage : storageImgUser
})

module.exports = {
    uploadImgProduct,
    uploadImgUser
}