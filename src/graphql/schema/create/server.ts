import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import * as createSchema from "./schema";
import { ContextAPI } from "../../@types/default";

export const serverCreate = new ApolloServer<ContextAPI>({
    schema: buildSubgraphSchema({ ...createSchema }),
});
