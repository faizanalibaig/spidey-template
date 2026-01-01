import { Request, Response, NextFunction } from 'express';

import * as AuthService from '@root/internals/auth/services/auth.service';
import * as AuthValidation from '@root/internals/auth/validations/auth.validation';
import { catchAsync, AppError } from '@root/core/utils/index';

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const result = AuthValidation.SignupSchema.safeParse({
      username,
      email,
      password,
    });

    if (!result.success) {
      return next(
        new AppError('Invalid input in the request body of signup', 400),
      );
    }

    const user = await AuthService.signup(username, email, password);

    if (!user) {
      return next(new AppError('Failed to signup user', 500));
    }

    res.status(201).json({ message: 'Signup successful', user });
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = AuthValidation.LoginSchema.safeParse({ email, password });

    if (!result.success) {
      return next(
        new AppError('Invalid input in the request body of login', 400),
      );
    }

    const user = await AuthService.login(email, password);

    if (!user) {
      return next(new AppError('Failed to login user', 500));
    }

    res.status(200).json({ message: 'Login successful', user });
  },
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new AppError('No token provided', 401));
    }

    const logoutResult = await AuthService.logout(token);

    if (!logoutResult) {
      return next(new AppError('Failed to logout user', 500));
    }

    res.status(200).json({ message: 'Logout successful' });
  },
);

export { signup, login, logout };
