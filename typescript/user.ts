import express from 'express';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { getHash } from 'utils';
const userRouter = express.Router();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/db.sqlite',
});

class User extends Model {
  declare username: string;
  declare password: string;
  declare name: string;
  declare image: string;
}

User.init(
  {
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

userRouter.put('/', async (req, res) => {
  // sign in
  const { username, password } = req.body;
  console.log({ username, password });

  const user = await User.findOne({ where: { username } });
  console.log(user);
  if (!user || user.password !== getHash(password)) {
    return res.json({ msg: 'Wrong username or password' });
  }

  return res.json({ imageUrl: user.image, name: user.name });
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
