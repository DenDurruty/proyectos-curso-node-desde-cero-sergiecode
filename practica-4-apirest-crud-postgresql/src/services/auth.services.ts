import { User } from "../models/user.interface"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

//AHORA HAY QUE IR A LA VARIABLE DE ENTORNO Y PONER UNA PALABRA SECRETA QUE NO VA A CONOCER
//NADIE MAS QUE NUESTRO SERVIDOR PARA PODER VER QUE EL TOKEN SEA REAL

export const generateToken = (user: User): string => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' }) 
}