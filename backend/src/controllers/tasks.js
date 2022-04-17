import {connect} from "../database"

export const login = async(req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM users where user = ? AND password = ?", [req.body.user, req.body.password]);
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