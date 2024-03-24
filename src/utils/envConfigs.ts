import * as env from "env-var";

export default {
    jwtExpiresIn: env.get('JWT_EXPIRES_IN').required().asIntPositive(),
    jwtSecret: env.get('JWT_SECRET').required().asString(),
    bcryptSalt: env.get('BCRYPT_SALT').required().asInt(),
};