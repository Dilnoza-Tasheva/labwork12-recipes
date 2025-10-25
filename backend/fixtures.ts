import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import config from './config';
import User from './models/User';
import Recipe from './models/Recipe';
import Comment from './models/Comment';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('recipes');
        await db.dropCollection('comments');
    } catch (e) {
        console.log("Collections not present, skipping drop...");
    }

    const [john, jane] = await User.create(
        { username: 'john', password: 'Qwerty123', displayName: 'John Doe', token: randomUUID() },
        { username: 'jane', password: 'Qwerty123', displayName: 'Jane Smith', token: randomUUID() }
    );

    const [recipe1, recipe2] = await Recipe.create(
        {
            user: john._id,
            title: 'Шакшука',
            text: 'Обжарить лук и перец, добавить томаты и яйца. Готовить до желаемой прожарки.',
            image: 'images/recipes/sample1.jpeg'
        },
        {
            user: jane._id,
            title: 'Паста Карбонара',
            text: 'Паста, яйца, пекорино/пармезан, панчетта. Смешать на выключенном огне.',
            image: 'images/recipes/sample2.jpeg'
        }
    );

    await Comment.create(
        { user: jane._id, recipe: recipe1._id, text: 'Очень вкусно!' },
        { user: john._id, recipe: recipe2._id, text: 'Получилось с первого раза!' }
    );

    await db.close();
};

run().catch(console.error);
