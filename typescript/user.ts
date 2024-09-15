import express from 'express';
import fs from 'fs';
import path from 'path';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { createIfNotExists, getHash } from './utils.js';
const userRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/db.sqlite',
});

class User extends Model {
  declare username: string;
  declare password: string;
  declare image: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'User' }
);

try {
  await sequelize.authenticate();
  await User.sync();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

userRouter.post('/', async (req, res) => {
  // sign in
  const { username, password } = req.body;
  console.log({ username, password });

  const user = await User.findOne({ where: { username } });
  console.log(user);
  if (!user || user.password !== getHash(password)) {
    return res.json({ msg: 'Wrong username or password' });
  }

  return res.json({ imageUrl: user.image, name: user.username });
});

userRouter.put('/', async (req, res) => {
  // sign up
  const { username, password } = req.body;

  try {
    const imageUrl = path.join(__dirname, 'images', `${username}.jpg`);

    const newUser = await User.create({
      username,
      password: getHash(password),
      image: imageUrl,
    });
    console.log(newUser);

    createIfNotExists(`${username}.jpg`);

    return res.status(201).json();
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.json({ msg: 'User already exists' });
    }
    return res
      .status(500)
      .json({ msg: 'Something went wront, please try again' });
  }
});

userRouter.put('/image', (req, res) => {
  // post image
  const { username, image } = req.body;
  console.log({ image });
  const binaryBuffer = Buffer.from(image.split('base64,')[1], 'base64');
  const imageUrl = path.join(__dirname, 'images', `${username}.jpg`);

  fs.writeFile(imageUrl, binaryBuffer, (error) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }
    return res.json({ msg: 'Image uploaded successfully' });
  });

  res.json();
});

export default userRouter;
