import {connect} from "../database"

export const test = async(req, res) => {
    const connection = await connect();
    console.log("Connection status: " + connection.status);
    const [rows] = await connection.query("SELECT * FROM users");
    res.join(rows);

    console.log("testing")
}