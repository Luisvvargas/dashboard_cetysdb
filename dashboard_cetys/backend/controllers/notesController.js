import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE
});

export async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to database");
    } catch (err) {
        console.error("Connection error", err.stack);
        throw err;
    }
}

export async function disconnectDB() {
    try {
        await client.end();
        console.log("Disconnected from DB");
    } catch (err) {
        console.error("Disconnection error", err.stack);
        throw err;
    }
}

export async function searchUser(id) {
    try {
        const res = await client.query(`
            SELECT u.matricula, u.nombre, u.carrera, 
                   CASE 
                       WHEN u.carrera LIKE '%Preparatoria%' THEN 'Preparatoria'
                       WHEN u.carrera LIKE '%Posgrado%' THEN 'Posgrado'
                       ELSE 'Profesional'
                   END as area,
                   CASE 
                       WHEN u.carrera = 'Empleado' THEN 'Empleado'
                       WHEN u.carrera = 'Profesor' THEN 'Profesor'
                       ELSE 'Estudiante'
                   END as tipo
            FROM usuario u 
            WHERE matricula = $1
        `, [id]);
        return res.rows;
    } catch (err) {
        console.log("Query error", err.stack);
        throw err;
    }
}

export async function insertUser(matricula, nombre, carrera) {
    try {
        const query = "INSERT INTO usuario (matricula, nombre, carrera) VALUES ($1, $2, $3)";
        const res = await client.query(query, [matricula, nombre, carrera]);
        console.log('Usuario insertado', res);
        return res;
    } catch (err) {
        console.error('Query error', err.stack);
        throw err;
    }
}

export async function selectAll() {
    try {
        const res = await client.query("SELECT * FROM usuario");
        return res.rows;
    } catch (err) {
        console.error("Query error");
        throw err;
    }
}

export async function insertIngreso(matricula, nombre, tipo, area) {
    try {
        const query = "INSERT INTO ingresos (matricula, nombre, tipo, area) VALUES ($1, $2, $3, $4) RETURNING *";
        const res = await client.query(query, [matricula, nombre, tipo, area]);
        return res.rows[0];
    } catch (err) {
        console.error('Query error', err.stack);
        throw err;
    }
}

export async function getIngresos() {
    try {
        const query = "SELECT * FROM ingresos ORDER BY hora DESC LIMIT 50";
        const res = await client.query(query);
        return res.rows;
    } catch (err) {
        console.error('Query error', err.stack);
        throw err;
    }
}