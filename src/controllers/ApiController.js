import pool from '../configs/connectDB';


const getAllUsers = async (req, res) => {
    const [row] = await pool.query('SELECT * FROM `users`');
    return res.status(200).json({
        message: 'success',
        data: row,
    });
};
const createUser = async (req, res) => {
    const { firstName, lastName, email, address } = req.body;

    //validate input data
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'invalid parameters',
        });
    }
    await pool.execute('insert into users(firstName,lastName,email,address) values(?,?,?,?)', [
        firstName,
        lastName,
        email,
        address,
    ]);

    return res.status(200).json({
        message: ' success',
    });
};

const updateUser = async (req, res) => {
    const { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id)
        return res.status(200).json({
            message: 'missing required params',
        });
    await pool.execute('update users set firstName = ? , lastName = ? , email = ? , address = ? where id = ?', [
        firstName,
        lastName,
        email,
        address,
        id,
    ]);
    res.status(200).json({
        message: 'success',
    });
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params',
        });
    }
    await pool.execute('delete from users where id = ?', [userId]);
    res.status(200).json({
        message: 'success',
    });
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
