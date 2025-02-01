import express from 'express'
import { register } from '../controllers/authControllers';

const router = express.Router()

//Rutas de autenticación
router.post('/register', register )
router.post('/login', () => {})

export default router;