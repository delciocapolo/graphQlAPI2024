import 'dotenv/config';
import env from 'env-var';

export const jwtExpiresIn: number = env.get('JWT_EXPIRES_IN').required().asIntPositive();
export const jwtSecret: string = env.get('JWT_SECRET').required().asString();
export const bcryptSalt: number = env.get('BCRYPT_SALT').required().asIntPositive();
export const port: number = env.get('PORT').required().asPortNumber();