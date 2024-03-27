import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as createSchema from "./schema";
import { ContextAPI } from "../../@types/default";
import { httpServer } from "../../../server.mjs";

export const serverCreate = new ApolloServer<ContextAPI>({
    schema: buildSubgraphSchema({ ...createSchema }),
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ]
});
