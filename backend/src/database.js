import mysql from "mysql2/promise";
import {config} from './config';

export const connect = async () => {
    console.log("Trying connection")
    console.log(config)
    console.log(await mysql.createConnection(config))
    return await mysql.createConnection(config);
}

