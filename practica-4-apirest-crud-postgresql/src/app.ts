import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import authRoutes from './routes/authRoutes'

const app = express()

app.use(express.json())

// Routes
app.use('/auth', authRoutes)

//Hacer una api rest de usuarios

// Autenticación


// Usuario




export default app
