import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import findSchema from "../../schema/find/schema";
import { ContextAPI } from "../../@types/default";

const serverFind = new ApolloServer<ContextAPI>({
    schema: buildSubgraphSchema({ ...findSchema })
});

export default serverFind;