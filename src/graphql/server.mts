import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./schema/schema";
import { randomUUID } from "crypto";

interface ContextAPI {
    token?: string;
}

const server = new ApolloServer<ContextAPI>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => ({
        token: randomUUID({ disableEntropyCache: true })
    })
});

console.log(`🚀 Server listening at: ${url}`);