
export type IUser = {
    id?: number;
    email: string;
    name?: string;
    posts: string[]
};

export type IPost = {
    id?: number;
    title: string;
    content?: string;
    authorId: number;
}

export type IProfile = {
    bio?: string;
    userId: number;
}