import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import createSchema from "./schema";
import { ContextAPI } from "../../@types/default";

const serverCreate = new ApolloServer<ContextAPI>({
    schema: buildSubgraphSchema({ ...createSchema })
});

export default serverCreate;