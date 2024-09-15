import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const salt = 'thecakeisalie';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHash = (password: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

export const createIfNotExists = (filename: string) => {
  const fullDirPath = path.join(__dirname, 'images');
  if (!fs.existsSync(fullDirPath)) {
    fs.mkdirSync(path.join(fullDirPath));
  }

  const defaultPath = path.join(__dirname, 'images', 'default.jpg');
  const fullPath = path.join(__dirname, 'images', filename);
  if (!fs.existsSync(fullPath)) {
    fs.copyFileSync(defaultPath, fullPath);
  }
};
