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

const login = () => {};
const logout = () => {};

export { signup, login, logout };
