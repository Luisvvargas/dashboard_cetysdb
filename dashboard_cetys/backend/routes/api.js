import express from 'express';
import {
    selectAll,
    searchUser,
    insertUser,
    insertIngreso,
    getIngresos,
    getUsersByCarrera,
    deleteUser,
    updateUser,
    deleteIngreso
} from '../controllers/notesController.js'

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await selectAll();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server error');
        throw err;
    }
});

router.get('/users/carrera/:carrera?', async (req, res) => {
    try {
        const carrera = req.params.carrera;
        const users = await getUsersByCarrera(carrera);
        res.json(users);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await searchUser(id);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/users', async (req, res) => {
    try {
        const { matricula, nombre, carrera } = req.body;
        const newUser = await insertUser(matricula, nombre, carrera);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send('Server error');
        throw err;
    }
});

router.post('/ingresos', async (req, res) => {
    try {
        const { matricula, nombre, tipo, area } = req.body;
        const newIngreso = await insertIngreso(matricula, nombre, tipo, area);
        res.status(201).json(newIngreso);
    } catch (err) {
        res.status(500).send('Server error');
        throw err;
    }
});

router.get('/ingresos', async (req, res) => {
    try {
        const ingresos = await getIngresos();
        res.json(ingresos);
    } catch (err) {
        res.status(500).send('Server error');
        throw err;
    }
});

router.delete('/users/:matricula', async (req, res) => {
    try {
        const result = await deleteUser(req.params.matricula);
        if (!result) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/users/:matricula', async (req, res) => {
    try {
        const { nombre, carrera } = req.body;
        const result = await updateUser(req.params.matricula, nombre, carrera);
        if (!result) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.delete('/ingresos/:matricula', async (req, res) => {
    try {
        const result = await deleteIngreso(req.params.matricula);
        if (!result) {
            return res.status(404).json({ message: 'Ingreso no encontrado' });
        }
        res.json(result);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

export default router;