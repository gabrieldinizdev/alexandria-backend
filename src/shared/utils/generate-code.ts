import * as crypto from 'crypto';

function generateCode(quantity: number): string {
  const char = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < quantity; i++) {
    const index = crypto.randomBytes(1)[0] % char.length;
    result += char[index];
  }

  return result;
}

export { generateCode };
