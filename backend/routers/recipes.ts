import express from 'express';
import Recipe from '../models/Recipe';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import {recipeImageUpload} from "../multer";

const recipesRouter = express.Router();

recipesRouter.get('/', async (_req, res) => {
    const items = await Recipe.find()
        .populate('user', 'displayName')
        .sort({ createdAt: -1 });
    res.send(items);
});

recipesRouter.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).send({error: 'Not found'});
    const recipe = await Recipe.findById(req.params.id).populate('user', 'displayName');
    if (!recipe) return res.status(404).send({error: 'Not found'});
    res.send(recipe);
});

recipesRouter.get('/by-user/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) return res.status(404).send({error: 'Not found'});
    const items = await Recipe.find({ user: userId })
        .populate('user', 'displayName')
        .sort({ createdAt: -1 });
    res.send(items);
});

recipesRouter.post('/', auth, recipeImageUpload.single('image'), async (req, res) => {
    try {
        if (!req.body.title || !req.body.text || !req.file) {
            return res.status(400).send({error: 'All fields are required'});
        }
        const recipe = await Recipe.create({
            user: (req as any).user._id,
            title: req.body.title,
            text: req.body.text,
            image: req.file ? req.file.filename : null
        });
        res.send(recipe);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send({error: e.message});
        }
        res.sendStatus(500);
    }
});

recipesRouter.delete('/:id', auth, async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send({error: 'Not found'});
    const user = (req as any).user;
    if (recipe.user.toString() !== user._id.toString()) {
        return res.status(403).send({error: 'Unauthorized'});
    }
    await Recipe.deleteOne({_id: recipe._id});
    res.status(204).send();
});

export default recipesRouter;
