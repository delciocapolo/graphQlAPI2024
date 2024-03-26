import 'dotenv/config';
import * as env from './utils/envConfigs';
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "node:http";
import cors from "cors";
import jwt from "jsonwebtoken";

import serverFind from "./graphql/schema/find/serverFind";
import serverCreate from "./graphql/schema/create/serverCreate";

const PORT = env.port | 4000;
const app = express();
const httpServer = http.createServer(app);

serverFind.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));
serverCreate.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));

await serverFind.start().then((_) => {
    console.log('GRAPHQL FIND SERVER IS RUNNING 📬');
});
await serverCreate.start().then((_) => {
    console.log('GRAPHQL CREATE SERVER IS RUNNING 📬');
});

app.use(cors<cors.CorsRequest>({
    origin: '*',
    methods: ['POST', 'PUT']
}));

app.use(express.json({
    limit: '5mb',
    verify(req, res, buf, encoding) {
        console.log(buf, encoding);
    },
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
                const token = jwt.sign(payload, env.jwtSecret, {
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