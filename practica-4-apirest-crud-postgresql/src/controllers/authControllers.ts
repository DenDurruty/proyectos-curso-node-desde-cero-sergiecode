import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import prisma from '../models/user'
import { generateToken } from "../services/auth.services";

export const register = async(req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body;

    try {

        const hashPwd = await hashPassword(password)   //necesitamos que el pass vaya directo por eso el hashed
        console.log(hashPwd);

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

    } catch (error) {
        // TODO mejorar los errores
        console.log(error);
        res.status(500).json({error: 'Hubo un error en el registro'});
        
    }
}
    
