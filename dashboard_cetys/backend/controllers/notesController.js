
import pkg from 'pg';
const {Client} = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE

});

export async function connectDB(){
    try {
        await client.connect();
        console.log("Connected do database");
        
    } catch (err) {
        console.error("Connection error", err.stack);
        throw err;
        
    }

};

export async function disconnectDB() {
    try {
        await client.end();
        console.log("Disconnected from DB");
        
    } catch (err) {
        console.error("Disconnection error",err.stack);
        throw err;
        
    }

};

export async function searchUser(id) {
    try {
        const res = await client.query(`SELECT nombre from usuario where matricula = $1`,[id]);
        return res.rows;
        
    } catch (err) {
        console.log("Query error", err.stack);
        throw err;
        
    }

};

export async function insertUser(matricula, nombre, carrera){
    try {
        const query = "INSERT INTO usuario (matricula, nombre, carrera) VALUES ($1, $2, $3)";
        const res = await client.query(query, [matricula, nombre, carrera]);
        console.log('Usuario insertado',res);
        return res;
        
    } catch (err) {
        console.error('Query error', err.stack);
        throw err;
        
    }
};

export async function selectAll(){
    try {
        const res = await client.query("SELECT * FROM usuario");
        return res.rows;
        
    } catch (err) {
        console.error("Query error");
        throw err;
        
    }
}
