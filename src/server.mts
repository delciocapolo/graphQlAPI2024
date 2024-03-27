import 'dotenv/config';
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "node:http";
import cors from "cors";
import jwt from "jsonwebtoken";

import { port, jwtSecret } from './utils/envConfigs';
import { serverFind } from "./graphql/schema/find/server";
import { serverCreate } from './graphql/schema/create/server';

const PORT = port | 4000;
const app = express();
export const httpServer = http.createServer(app);

await serverFind.start().then(() => { console.log('GRAPHQL FIND SERVER IS RUNNING 📬') });
await serverCreate.start().then(() => { console.log('GRAPHQL CREATE SERVER IS RUNNING 📬') });

app.use(cors<cors.CorsRequest>({
    origin: '*',
    methods: ['POST', 'PUT']
}));

app.use(express.json({
    limit: '15mb',
}));

app.use('/create',
    expressMiddleware(serverCreate, {
        context: async ({ req, res }) => ({
            token: () => {
                const { name, email } = req.body;
                const payload = {
                    name,
                    email
                };
                const token = jwt.sign(payload, jwtSecret, {
                    expiresIn: 60 * 60
                });
                return {
                    createToken: res.status(201).setHeader('Authorization', `Bearer ${token}`),
                    findToken: req.headers['authorization'],
                };
            }
        })
    }),
);

app.use('/user', expressMiddleware(serverFind));

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server listening at: http://localhost:${PORT}/`);