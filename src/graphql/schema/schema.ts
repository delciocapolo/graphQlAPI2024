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
        authorId: Int
        title: String!
        content: String
    }

    type Query {
        done: String!
    }

    type Mutation {
        createUser(user: CreateUser): UserSchema!
        createProfile(profile: CreateProfile): ProfileSchema!
        createPost(post: CreatePost): PostSchema!
    }
`;

export const resolvers = {
    Query: {
        done: () => "funcionando!"
    },
    Mutation: {
        async createUser(_: any, { user }: { user: IUser }, ctx: any) {
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
            }

            const data = await databaseConnection.createUser(user);
            return data
        },
        async createProfile(_: any, { profile }: { profile: IProfile }, ctx: any) {
            const schema = await databaseConnection.createProfile(profile);
            return schema;
        },
        async createPost(_: any, { post }: { post: IPost }, ctx: any) {
            const schema = await databaseConnection.createPost(post);
            return schema;
        }
    }
};

