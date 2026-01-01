import { UserModel } from '@root/internals/auth/models/auth.model';
import { AppError } from '@root/core/utils/index';

const signup = async (username: string, email: string, password: string) => {
  const user = new UserModel({ username, email, password });
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
const login = () => {};
const logout = () => {};

export { signup, login, logout };
