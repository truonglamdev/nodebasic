import express from 'express';
import multer from 'multer';
import path from 'path';
const appRoot = require('app-root-path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    router.get('/', HomeController.getHomePage);
    router.get('/detail/user/:userId', HomeController.getDetailPage);
    router.post('/create-new-user', HomeController.createNewUser);
    router.post('/delete-user/:userId', HomeController.deleteUser);
    router.get('/edit-user/:userId', HomeController.getEditUser);
    router.post('/update-user/:userId', HomeController.updateUser);

    router.get('/upload', HomeController.uploadFile);
    router.post('/upload-file', upload.single('myFile'), HomeController.handleUploadFile);

    router.get('/about', (req, res) => {
        res.send('Nguyễn Trường Lâm');
    });
    return app.use('/', router);
};

export default initWebRoute;
