import {pool} from "../db.js";


export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user')
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
};

export const getUser = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [req.params.id])

        if (rows.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
};

export const createUser = async (req, res) => {
    const {username, email} = req.body;
    const [rows] = await pool.query('INSERT INTO user (username, email) VALUES (?, ?)', [username, email])
    res.send({
        id: rows.insertId,
        username,
        email
    });
};

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {username, email} = req.body;
    const [result] = await pool.query('UPDATE user SET username = IFNULL(?, username), email = IFNULL(?, email) WHERE id = ?', [username, email, id])

    if (result.affectedRows === 0) {
        return res.status(404).json({message: "User not found"});
    }

    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id])

    res.json(rows[0]);
}

export const deleteUser = async (req, res) => {
    try{
        const [result] = await pool.query('DELETE FROM user WHERE id = ?', [req.params.id])
     
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "User not found"});
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
};