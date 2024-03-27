import databaseConnection from "../../../model/databaseConnection";
import path from "path";
import { readFileSync } from "fs";
import gql from "graphql-tag";
import { DATESCALAR } from "../../utils/DateScalar";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const typeDefs = gql(
    readFileSync(
        path.resolve(__dirname, 'schema.graphql'), {
        encoding: 'utf-8'
    })
);

export const resolvers = {
    Date: DATESCALAR,
    Query: {
        getAllUsers: async (_: any, args: any, ctx: any) => {
            return await databaseConnection.getAllUsers();
        },
        getUser: async (_: any, { email }: { email: string }) => {
            return await databaseConnection.getUser(email);
        }
    },
};