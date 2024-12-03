import express from 'express';
import { selectAll, searchUser, insertUser, insertIngreso, getIngresos } from '../controllers/notesController.js'

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

export default router;