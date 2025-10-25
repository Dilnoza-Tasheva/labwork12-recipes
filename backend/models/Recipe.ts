import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

export interface RecipeFields {
    user: mongoose.Types.ObjectId;
    title: string;
    text: string;
    image: string;
    createdAt: Date;
}

const RecipeSchema = new Schema<RecipeFields>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist'
        }
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    text: {
        type: String,
        required: [true, 'Recipe text is required'],
        trim: true,
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    }
});

const Recipe = mongoose.model<RecipeFields>('Recipe', RecipeSchema);
export default Recipe;
