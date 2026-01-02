import { UserModel, BlacklistModel } from '@root/internals/auth/models';
import { AppError } from '@root/core/utils/index';

const signup = async (username: string, email: string, password: string) => {
  const user = new UserModel({ username, email, password });
  user.password = await user.HashPassword(password);

  await user.save();

  if (!user) {
    throw new AppError('Failed to signup user', 500);
  }

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
};
const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user || !(await user.ComparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = await user.GenerateToken();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
};

const logout = async (token: string) => {
  const userLogout = await BlacklistModel.create({ token });

  if (!userLogout) {
    throw new AppError('Failed to logout user', 500);
  }

  return true;
};

export { signup, login, logout };
