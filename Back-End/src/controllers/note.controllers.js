const db = require("../database/dabase.connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const login = async (req,res) => {
    try {
        const {username, password} = req.body
        const query = "SELECT * FROM login WHERE username = ? AND password = ?";
        const [data] = await db.execute(query, [username, password])
        if(data.length === 0){
            res.status(404).json({
                message: "User not found",
                status: res.statusCode
            })
        }
        const user = data[0]
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            }, "SECRET_KEY"
        )
        res.status(200).json({
            token: token,
            message: "user berhasil login",
            status: res.statusCode,
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "user gagal login",
            status: res.statusCode,
        })
    }
}
const createNote = async (req, res) => {
    try {
        const {token, judul, catatan} = req.body
        const decodedToken = jwt.verify(token, "SECRET_KEY")
        const userID = decodedToken.id
        const query = "INSERT INTO note(id, judul, catatan) VALUES (?, ?, ?)"
        await db.query(query, [userID, judul, catatan])
        res.status(200).json({
            message: "create note success",
            status: res.statusCode,
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "create note gagal",
            status: res.statusCode,
            statusMessage: err,
        })  
    }
}
const Acara = async(req,res) => {
    try {
        const { token } = req.body;
        const decodedToken = jwt.verify(token, "SECRET_KEY")
        console.log(decodedToken)
        const userID = decodedToken.id
        const query = "SELECT * FROM note WHERE id = ?";
        const [note] = await db.execute(query, [userID]);
        res.status(200).json({
            message: "get data berhasil",
            note: note,
            status: res.statusCode
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "get data gagal",
            status: res.statusCode
        })
    }
}
const DeleteAcara = async(req, res) =>{
    try {
        const idDelete = req.params.id
        const query = "DELETE FROM note WHERE id_note = ?"
        const note = await db.execute(query, [idDelete])
        res.status(200).json({
            message: "delete data berhasil",
            idDelete: idDelete,
            status: res.statusCode
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "delete data gagal",
            status: res.statusCode
        })
    }
}
const SignUp = async(req, res) =>{
    try {
        const {username, password, confirmPassword} = req.body;
        if(password != confirmPassword){
            return res.status(400).json({
                message: "Password do not match"
            })
        }
        const query = "INSERT INTO login (username, password) VALUES (?,?)"
        const signUp = await db.execute(query, [username, password])
        res.status(200).json({
            message: "SignUp berhasil",
            status: res.statusCode
        })
    } catch (error) {
        console.log("Sign Up gagal", error.message)
        res.status(400).json({
            message: "SignUp gagal",
            status: res.statusCode
        })
    }
}
module.exports = {
    login,
    createNote,
    Acara,
    DeleteAcara,
    SignUp
}