import {connect} from "../database"

export const login = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM users WHERE user = ? AND password = ?", [req.body.user, req.body.password]);
    if(rows[0]){
        res.status(200).json({
            user: rows[0],
            code: 200
        });
    }else{
        res.status(404).json({
            user: null,
            code: 404
        });
    }
}

export const existUser = async(user) => {
    let result = false;
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM users WHERE user = ?", [user]);
    if(rows[0]){
        result = true;
    }
    return result;
}

export const register = async(req, res) => {
    if(!await existUser(req.body.user)){
        const connection = await connect();
        await connection.query("INSERT INTO users (name, surname, user, password, permission) values (?,?,?,?,?)",
        [req.body.name, req.body.surname, req.body.user, req.body.password, req.body.permission]);
        res.status(200).json({
            code: 200,
            exist: false
        });
    }else{
        res.status(400).json({
            code: 400,
            exist: true
        });
    }
}