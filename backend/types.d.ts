import { Request } from "express";
import { HydratedDocument, Types } from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    googleId?: string;
}

export interface RecipeFields {
    user: Types.ObjectId;
    title: string;
    text: string;
    image: string;
    createdAt: Date;
}

export interface CommentFields {
    user: Types.ObjectId;
    recipe: Types.ObjectId;
    text: string;
    createdAt: Date;
}

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserFields>;
}
