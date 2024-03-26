import gql from "graphql-tag";
import databaseConnection from "../../../model/databaseConnection";
import { readFileSync } from "fs";
import path from "path";

export const typeDefs = gql(
    readFileSync(
        path.resolve(__dirname, 'schema.graphql'), {
        encoding: 'utf-8'
    })
);

export const resolvers = {
    Query: {
        getAllUsers: async (_: any, args: any, ctx: any) => {
            return await databaseConnection.getAllUsers();
        },
        getUser: async (_: any, { email }: { email: string }) => {
            return await databaseConnection.getUser(email);
        }
    },
};

export default {
    resolvers,
    typeDefs
}