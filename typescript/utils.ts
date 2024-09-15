import crypto from 'crypto';

const salt = 'thecakeisalie';

export const getHash = (password: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};
