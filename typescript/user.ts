import express from 'express';
const userRouter = express.Router();

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
