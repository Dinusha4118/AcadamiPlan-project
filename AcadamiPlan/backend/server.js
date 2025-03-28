import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import connectDB from './config/db.js';
import setupWebSocket from './utils/websocket.js';
import conflictRoutes from './routes/conflictRoutes.js';

dotenv.config();
connectDB();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const server = createServer(app);
const io = setupWebSocket(server);


app.listen(port)
app.use(express.json());
app.use(cors());

app.use('/api/conflicts', conflictRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
