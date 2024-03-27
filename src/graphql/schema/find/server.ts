import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as findSchema from "./schema";
import { ContextAPI } from "../../@types/default";

export const serverFind = new ApolloServer<ContextAPI>({
    schema: buildSubgraphSchema({ ...findSchema }),
});
