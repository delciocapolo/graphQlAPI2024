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
            return await databaseConnection.getAllUsers();
        },
        getUser: async (_: any, { email }: { email: string }) => {
            const schema = z.object({
                email: z.string().email({
                    message: 'Informe um email valido'
                })
            });

            const validationResult = schema.safeParse({ email });
            if (!validationResult.success) {
                console.error(JSON.stringify({ message: 'Email inválido' }, null, 2));
                return null;
            }

            return await databaseConnection.getUser(email);
        }
    },
    Mutation: {
        async createUser(_: any, { user }: { user: IUser }, ctx: any) {
            const schema = z.object({
                email: z.string().email({
                    message: 'Informe um email válido'
                }).min(1, {
                    message: 'O email é necessário'
                }),
                name: z.string()
            });

            const validationResult = schema.safeParse(user);

            if (!validationResult.success) {
                console.error(JSON.stringify(validationResult, null, 2));
                return null;
            }

            try {
                return await databaseConnection.createUser(user);
            } catch (error: any) {
                console.error(JSON.stringify({ status: 401, message: error.message }, null, 2));
            }
        },
        async createProfile(_: any, { profile }: { profile: IProfile }, ctx: any) {
            try {
                return await databaseConnection.createProfile(profile);
            } catch (error: any) {
                console.error(JSON.stringify({ status: 401, message: error.message }, null, 2));
            }
        },
        async createPost(_: any, { post }: { post: IPost }, ctx: any) {
            try {
                return await databaseConnection.createPost(post);
            } catch (error: any) {
                console.error(JSON.stringify({ status: 401, message: error.message }, null, 2));
            }
        }
    }
};
