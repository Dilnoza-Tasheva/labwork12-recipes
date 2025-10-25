import express from 'express';
import Comment from '../models/Comment';
import Recipe from '../models/Recipe';
import mongoose from 'mongoose';
import auth from '../middleware/auth';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const { recipe } = req.query;
    if (!recipe || typeof recipe !== 'string' || !mongoose.isValidObjectId(recipe)) {
        return res.status(400).send({error: 'query recipe is required'});
    }
    const items = await Comment.find({ recipe }).populate('user', 'displayName').sort({ createdAt: -1 });
    res.send(items);
});

commentsRouter.post('/', auth, async (req, res) => {
    try {
        const { recipe, text } = req.body;
        if (!recipe || !text) return res.status(400).send({error: 'recipe and text are required'});
        const recipeDoc = await Recipe.findById(recipe);
        if (!recipeDoc) return res.status(404).send({error: 'Recipe not found'});

        const comment = await Comment.create({
            user: (req as any).user._id,
            recipe,
            text,
        });
        res.send(await comment.populate('user', 'displayName'));
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({error: e.message});
        }
        res.sendStatus(500);
    }
});

commentsRouter.delete('/:id', auth, async (req, res) => {
    const user = (req as any).user;
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send({error: 'Not found'});

    const recipe = await Recipe.findById(comment.recipe);
    const isCommentAuthor = comment.user.toString() === user._id.toString();
    const isRecipeAuthor = recipe && recipe.user.toString() === user._id.toString();

    if (!isCommentAuthor && !isRecipeAuthor) return res.status(403).send({error: 'Unauthorized'});

    await Comment.deleteOne({_id: comment._id});
    res.status(204).send();
});

export default commentsRouter;
