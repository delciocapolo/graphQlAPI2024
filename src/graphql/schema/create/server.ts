import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import createSchema from "../../schema/create/schema";
import { ContextAPI } from "../../@types/default";

const server = new ApolloServer<ContextAPI>({
    schema: buildSubgraphSchema({ ...createSchema })
});

export default server;