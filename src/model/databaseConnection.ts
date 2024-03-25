import { PrismaClient } from "@prisma/client";
import { IPost, IProfile, IUser } from "./@types/IDatabase";

class DatabaseConnection {
    public prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // create methods
    async createUser({ name, email }: IUser) {
        await this.prisma['$connect']();

        this.getUser(email);

        const data = await this.prisma['user'].create({
            data: {
                name,
                email,
            }
        });
        await this.prisma['$disconnect']();

        return data;
    }

    async createProfile({ bio, userId }: IProfile) {
        await this.prisma['$connect']();

        const data = await this.prisma['profile'].create({
            data: {
                bio,
                userId
            }
        });
        await this.prisma['$disconnect']();

        return data;
    }

    async createPost({ authorId, title, content }: IPost) {
        await this.prisma['$connect']();
        const data = await this.prisma['post'].create({
            data: {
                title,
                content,
                authorId,
                published: true,
            }
        });
        await this.prisma['$disconnect']();

        return data;
    }

    // fetch methods
    async getAllUsers() {
        return await this.prisma['user'].findMany();
    }

    async getUser(email: string) {
        const data = await this.prisma['user'].findUnique({
            where: {
                email,
            }
        });

        if (data === null) {
            return { message: 'User dont exists', error: 401 };
        }

        return data;
    }
};

export default new DatabaseConnection();