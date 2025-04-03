import jwt from "jsonwebtoken";
import UserModel from '../models/usersModel';

const secret = "your_secret_key"; 

export const generateToken = (user: any): string => {
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1h", 
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};