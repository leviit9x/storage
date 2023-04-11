export const ERROR_MESSAGE = {
  SERVER_ERR: 'An error has occurred, please try again later!',
  USER_NOTFOUND: 'User not found!',
  REGISTER_USER_FOUND: 'User found!',
  MISSING_PROP_UPDATE_USER: 'You must provide at least 1 field!',
  EMAIL_ALREADY_EXIT: 'Email already exit!',
} as const;

export const RES_MESSAGE = {
  REGISTER_SUCCESS: 'Register success!',
  LOGIN_SUCCESS: 'Login success',
  LOGOUT_SUCCESS: 'Logout successful',
  REFRESH_SUCCESS: 'Refresh successful',
} as const;
