import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import apiRoutes from './routes/api.js';
import { connectDB, disconnectDB } from './controllers/notesController.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use('/api', apiRoutes);

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('nuevoIngreso', async (data) => {
    io.emit('actualizarIngresos', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

httpServer.listen(PORT, async () => {
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