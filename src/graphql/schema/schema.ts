import { z } from "zod";
import { IPost, IProfile, IUser } from "../../model/@types/IDatabase";
import databaseConnection from "../../model/databaseConnection";

export const typeDefs = `#graphql
    scalar Date

    type UserSchema {
        id: Int!
        email: String!
        name: String
    }

    type ProfileSchema {
        id: Int!
        bio: String
        userId: Int!
    }

    type PostSchema {
        id: Int!
        title: String!
        content: String
        published: Boolean!
        authorId: Int!
        createAt: Date
        updatedAt: Date
    }

    input CreateUser {
        name: String
        email: String!
    }

    input CreateProfile {
        bio: String
        userId: Int
    }

    input CreatePost {
        authorId: Int!
        title: String!
        content: String
    }

    type Query {
        getAllUsers: [UserSchema!]!
        getUser(email: String!): UserSchema!
    }

    type Mutation {
        createUser(user: CreateUser): UserSchema!
        createProfile(profile: CreateProfile): ProfileSchema!
        createPost(post: CreatePost): PostSchema!
    }
`;

export const resolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                return await Promise.resolve(databaseConnection.getAllUsers());
            } catch (reason) {
                console.error(reason);
            }
        },
        getUser: (_: any, { email }: { email: string }) => {
            const schema = z.object({
                email: z.string().email({
                    message: 'Informe um email valido'
                })
            });

            if (!schema.safeParse({ email }).success) {
                console.error('Email invalido');
                return;
            }

            return Promise.resolve(databaseConnection.getUser(email));
        }
    },
    Mutation: {
        createUser(_: any, { user }: { user: IUser }, ctx: any) {
            const schema = z.object({
                email: z.string().email({
                    message: 'Informe um email valido'
                }).min(1, {
                    message: 'O email e necessario'
                }),
                name: z.string()
            });

            if (!schema.safeParse(user).success) {
                console.log('Os valores nao estao correctos');
                return;
            }

            return Promise.resolve(databaseConnection.createUser(user)).catch((reason) => {
                console.error(JSON.stringify({ status: 401, message: reason }, null, 2));
            });
        },
        createProfile(_: any, { profile }: { profile: IProfile }, ctx: any) {
            return Promise.resolve(databaseConnection.createProfile(profile)).catch((reason) => {
                console.error(JSON.stringify({ status: 401, message: reason }, null, 2))
            });
        },
        createPost(_: any, { post }: { post: IPost }, ctx: any) {
            return Promise.resolve(databaseConnection.createPost(post)).catch((reason) => {
                console.error(JSON.stringify({ status: 401, message: reason }, null, 2))
            });
        }
    }
};

