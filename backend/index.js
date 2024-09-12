import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: '10MB' }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/uploadImage', (req, res) => {
  const { encodedImage } = req.body;
  const binaryBuffer = Buffer.from(encodedImage.split('base64,')[1], 'base64');
  const imagePath = path.join(__dirname, 'images', 'uploadedImage.jpg');

  fs.writeFile(imagePath, binaryBuffer, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }
    res.json({ message: 'Image uploaded successfully', imagePath });
  });
});

app.listen(5001, () => console.log('Backend listening on port 5001'));
