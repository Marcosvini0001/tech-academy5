import jwt from "jsonwebtoken";
import UserModel from '../models/usersModel';

const secret = "your_secret_key"; // Replace with a secure secret key

export const generateToken = (user: any): string => {
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};