import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { USerPayloudI } from '../../shared/userPayload';
// sing

// type JWT_PAYLOAD = { sub: string; name: string };
const JWT_SECRET = process.env.JWT_SECRET!;
export const singJWT = (payload: USerPayloudI, options?: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m',...options });
};

export const verifyJWT = (token: string): USerPayloudI => {
  return jwt.verify(token, JWT_SECRET) as USerPayloudI;
};