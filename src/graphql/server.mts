import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./schema/schema";

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server);

console.log(`🚀 Server listening at: ${url}`);