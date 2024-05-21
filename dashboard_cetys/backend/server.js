//aqui es donde ira express js
import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import { connectDB, disconnectDB } from './controllers/notesController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));

app.use(express.json());
app.use('/api', apiRoutes);
app.use(cors());

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);

    } catch (err) {
        console.error("Failed to connect database", err.stack);
        

    }

});

process.on('SIGTERM', async () => {
    try {
        await disconnectDB();
        process.exit(0);
    } catch (err) {
        process.exit(1);

    }
});

process.on('SIGINT', async () => {
    try {
        await disconnectDB();
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
});

