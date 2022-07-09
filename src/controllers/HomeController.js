import pool from '../configs/connectDB';
import multer from 'multer';

const getHomePage = async (req, res) => {
    const [row, fields] = await pool.query('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: row });
};

//[GET] /detail/user/:id
const getDetailPage = async (req, res) => {
    const userId = req.params.userId;
    const [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [userId]);
    res.send(JSON.stringify(user));
};

//[POST] /create-new-user
const createNewUser = async (req, res) => {
    await pool.execute('insert into users(firstName,lastName,email,address) values(?,?,?,?)', [
        firstName,
        lastName,
        email,
        address,
    ]);
    res.redirect('/');
};

//DELETE USER [POST]   /delete-users/:id

const deleteUser = async (req, res) => {
    const [userId] = req.params.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    res.redirect('/');
};

//[GET]  /edit-user/:id
const getEditUser = async (req, res) => {
    const userId = req.params.userId;
    const [user] = await pool.execute('SELECT * FROM `users` WHERE id = ?', [userId]);
    res.render('updateUser.ejs', { dataUser: user });
};

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { firstName, lastName, email, address } = req.body;
    await pool.execute('update users set firstName = ? , lastName = ? , email = ? , address = ? where id = ?', [
        firstName,
        lastName,
        email,
        address,
        userId,
    ]);
    res.redirect('/');
};

//HANDLER UPLOAD FILE

const uploadFile = async (req, res) => {
    res.render('uploadFile.ejs');
};

const upload = multer().single('myFile');

const handleUploadFile = async (req, res) => {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(
            `You have uploaded this image: <hr/><img src="${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`,
        );
    });
};

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditUser,
    updateUser,
    uploadFile,
    handleUploadFile,
};
