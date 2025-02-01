/*import bcrypt from 'bcrypt';

// la cantidad de vueltas/ saltos que va a dar van a hacer que sea más seguro.
// se suelen utilizar 10

const SALT_ROUNDS: number = 10

export const hashedPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

// Leer y comparar con el hash de la base de datos
*/

import bcrypt from 'bcrypt';

const SALT_ROUNDS: number = 10

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}