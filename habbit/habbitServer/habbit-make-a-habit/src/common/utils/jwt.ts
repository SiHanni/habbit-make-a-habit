import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/users/entities/user.entity';

export const generateJwtToken = async (user: User): Promise<string> => {
  const payload = {
    email: user.email,
    username: user.username,
  };
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT secret key not defined in environment!');
  }
  return jwt.sign(payload, secretKey, { expiresIn: '60h' });
};
