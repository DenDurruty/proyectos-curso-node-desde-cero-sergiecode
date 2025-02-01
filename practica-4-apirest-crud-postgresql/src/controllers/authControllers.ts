import { Request, Response } from "express";
import { comparePasswords, hashedPassword } from "../services/password.service";
import prisma from '../models/user'
import { generateToken } from "../services/auth.services";


export const register = async(req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body; 

    try {
/*
        if(!email) throw new Error('El mail es obligatorio.')
        if(!password) throw new Error('El password es obligatorio.')
*/
        if (!email) {
            res.status(400).json({ message: 'El email es obligatorio.' })
            return
        }
        if (!password) {
            res.status(400).json({ message: 'El password es obligatorio.' })
            return
        }

        const hashPwd = await hashedPassword(password)   //necesitamos que el pass vaya directo por eso el hashed
        

        // instancia de prisma para poder conectar esto a una bd sql. 
        // prisma nos sirve para no tener que hacer todas las especificaciones de una bd a mano, como por ej el create
        const user = await prisma.create(
            {
                data: {
                    email,
                    password: hashPwd
                }
            }
        )

        const token = generateToken(user);
        res.status(201).json({ token });

    } catch (error:any) {

        if(error?.code === 'P2002' && error?.meta?.target?.includes('email')){
            res.status(400).json({ message: 'El mail ingresado ya existe.'})
        }

        console.log(error);
        res.status(500).json({ error: 'Hubo un error en el registro.'})
        
    }
}


export const login = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    try {

        if (!email) {
            res.status(400).json({ message: 'El email es obligatorio.' })
            return
        }
        if (!password) {
            res.status(400).json({ message: 'El password es obligatorio.' })
            return
        }

        const user = await prisma.findUnique({ where: { email }})
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado.'})
            return
        }

        const passwordMatch = await comparePasswords(password, user.password)
        if(!passwordMatch) {
            res.status(401).json({ error: 'Usuario y contraseña no coinciden.'})
        }

        const token = generateToken(user)
        res.status(200).json({ token })

    } catch (error:any) {
        console.log('Error: ', error)
    }
}
