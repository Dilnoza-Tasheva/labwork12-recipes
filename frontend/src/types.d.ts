export interface User {
    _id: string;
    username: string;
    displayName: string;
    token: string;
}

export interface RecipeUser {
    _id: string;
    displayName: string;
}

export interface Recipe {
    _id: string;
    user: RecipeUser;
    title: string;
    text: string;
    image: string;
    createdAt: string;
}

export interface RecipeMutation {
    title: string;
    text: string;
    image: File | null;
}

export interface Comment {
    _id: string;
    user: RecipeUser;
    recipe: string;
    text: string;
    createdAt: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: Record<string, { message: string; name: string }>;
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError { error: string; }