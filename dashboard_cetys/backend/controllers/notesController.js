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
        const query = `
            SELECT i.*, u.carrera 
            FROM ingresos i 
            LEFT JOIN usuario u ON i.matricula = u.matricula 
            ORDER BY i.hora DESC LIMIT 50
        `;
        const res = await client.query(query);
        return res.rows;
    } catch (err) {
        console.error('Query error', err.stack);
        throw err;
    }
}

export async function getUsersByCarrera(carrera) {
    try {
        const query = carrera ? "SELECT * FROM usuario WHERE carrera = $1" : "SELECT * FROM usuario";
        const values = carrera ? [carrera] : [];
        const res = await client.query(query, values);
        return res.rows;
    } catch (err) {
        console.error('Query error', err.stack);
        throw err;
    }
}

export async function deleteUser(matricula) {
    try {
        const query = "DELETE FROM usuario WHERE matricula = $1 RETURNING *";
        const res = await client.query(query, [matricula]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function updateUser(matricula, nombre, carrera) {
    try {
        const query = "UPDATE usuario SET nombre = $2, carrera = $3 WHERE matricula = $1 RETURNING *";
        const res = await client.query(query, [matricula, nombre, carrera]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function deleteIngreso(matricula) {
    try {
        const query = "DELETE FROM ingresos WHERE matricula = $1 RETURNING *";
        const res = await client.query(query, [matricula]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}