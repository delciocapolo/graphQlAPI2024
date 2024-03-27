import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as findSchema from "./schema";
import { ContextAPI } from "../../@types/default";
import { httpServer } from "../../../server.mjs";

export const serverFind = new ApolloServer<ContextAPI>({
    schema: buildSubgraphSchema({ ...findSchema }),
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ]
});
