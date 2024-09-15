import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createIfNotExists } from 'utils.js';
import userRouter from './user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

createIfNotExists('player1.jpg');
createIfNotExists('player2.jpg');

const app = express();

app.use(express.json({ limit: '10MB' }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/uploadImage', (req, res) => {
  const { player, encodedImage } = req.body;
  const binaryBuffer = Buffer.from(encodedImage.split('base64,')[1], 'base64');
  const imagePath = path.join(__dirname, 'images', `player${player}.jpg`);

  fs.writeFile(imagePath, binaryBuffer, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }
    return res.json({ message: 'Image uploaded successfully', imagePath });
  });
});

app.use('/api/user', userRouter);

app.listen(5001, () => console.log('Backend listening on port 5001'));
