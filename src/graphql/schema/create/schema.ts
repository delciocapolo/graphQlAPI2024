import { IUser, IPost, IProfile } from "../../../model/@types/IDatabase";
import databaseConnection from "../../../model/databaseConnection";

import path from "node:path";
import { readFileSync } from "node:fs";
import { gql } from "graphql-tag";
import { DATESCALAR } from "../../utils/DateScalar";
import { fileURLToPath } from 'node:url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const typeDefs = gql(
    readFileSync(path.resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' })
);

export const resolvers = {
    Date: DATESCALAR,
    Query: {
        done: () => "Create user route defined"
    },
    Mutation: {
        async createUser(_: any, { user }: { user: IUser }, ctx: any) {
            try {
                ctx.token().createToken;
                return await databaseConnection.createUser(user);
            } catch (error: any) {
                console.error(JSON.stringify({ status: 401, message: error.message }, null, 2));
            }
        },
        async createProfile(_: any, { profile }: { profile: IProfile }, ctx: any) {
            try {
                console.log('TOKEN: ' + ctx.token().findToken);
                return await databaseConnection.createProfile(profile);
            } catch (error: any) {
                console.error(JSON.stringify({ status: 401, message: error.message }, null, 2));
            }
        },
        async createPost(_: any, { post }: { post: IPost }, ctx: any) {
            try {
                console.log('TOKEN: ' + ctx.token().findToken);
                return await databaseConnection.createPost(post);
            } catch (error: any) {
                console.error(JSON.stringify({ status: 401, message: error.message }, null, 2));
            }
        }
    }
};
