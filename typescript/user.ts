import express from 'express';
import { DataTypes, Sequelize } from 'sequelize';
const userRouter = express.Router();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/db.sqlite',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  name: DataTypes.STRING,
  image: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
});

try {
  await sequelize.authenticate();
  await User.sync();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

try {
  const newUser = await User.create({
    username: 'Test',
    password: '1234',
    name: 'Tset',
  });
  console.log('created new user', newUser);
} catch (error) {
  if (error.name === 'SequelizeUniqueConstraintError') {
    console.log('username already in use');
  }
}

userRouter.put('/', (req, res) => {
  // sign in
  const { username, password } = req.body;
  console.log({ username, password });

  res.json({ imageUrl: '', name: '' });
});

userRouter.post('/', (req, res) => {
  // sign up
  const { name, username, password } = req.body;
  console.log({ name, username, password });

  res.json();
});

userRouter.delete('/', (_req, res) => {
  // sign out

  res.json();
});

userRouter.put('/image', (req, res) => {
  // post image
  const { image } = req.body;
  console.log({ image });

  res.json({ imageUrl: '' });
});

export default userRouter;
