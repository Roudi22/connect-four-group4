import fs from 'fs';
import express from 'express';
import crypto from 'crypto';

const salt = 'paraplanedasdadasjkdlasdasljasd2uas';

function getHash(toEncrypt) {
  return crypto.pbkdf2Sync(toEncrypt, salt, 1000, 64, 'sha512').toString('hex');
}

const app = express();

// Serve the image folder under /user-data
const imageServer = express();
imageServer.use(express.static('images'));
app.use('/user-data', imageServer);

// Parse JSON bodies
app.use(express.json({ limit: '10MB' }));

// Upload image endpoint
app.post('/api/uploadImage', (req, res) => {
  const { encoded } = req.body;
  const binaryBuffer = Buffer.from(encoded.split('base64,')[1], 'base64');
  const userFolder = './images/' + getHash('default');

  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder, { recursive: true });
  }

  fs.writeFileSync(userFolder + '/userProfileImage.jpg', binaryBuffer);

  res.json({ ok: true });
});

app.listen(5001, () =>
  console.log('Backend listening on http://localhost:5001')
);
