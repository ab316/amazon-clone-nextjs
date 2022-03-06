import crypto from 'crypto';

export function decrypt(data) {
  const decipher = crypto.createDecipheriv(
    'aes-128-cbc',
    process.env.SERVICE_ENCRYPTION_KEY,
    process.env.SERVICE_ENCRYPTION_IV,
  );

  let decypted = decipher.update(data, 'base64', 'utf8');
  decypted += decipher.final('utf8');
  return decypted;
}
