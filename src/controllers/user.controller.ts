import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../config';
import Logger from '../utils/Logger';
const logger = Logger.getInstance();

export const generateUsernameJwtToken = (id: string) =>
  jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '7d',
  });

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ where: { username } });

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'User not found or Invalid password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'User not found or Invalid password' });
    }

    return res.status(httpStatus.OK).json({
      message: 'Login successful',
      token: generateUsernameJwtToken(user.id as string),
    });
  } catch (error) {
    logger.error('Error during login:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};

export const userRegister = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await UserModel.create({
      username,
      password: hashedPassword,
    });

    return res.status(httpStatus.CREATED).json({
      message: 'User registered successfully',
      token: generateUsernameJwtToken(userCreated.id as string),
    });
  } catch (error) {
    logger.error('Error during registration:', error);

    if ((error as Error).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: 'Username already exists' });
    }

    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};
