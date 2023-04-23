export const ERROR_MESSAGE = {
  SERVER_ERR: 'An error has occurred, please try again later!',
  USER_NOTFOUND: 'User not found!',
  REGISTER_USER_FOUND: 'User found!',
  MISSING_PROP_UPDATE_USER: 'You must provide at least 1 field!',
  EMAIL_ALREADY_EXIST: 'Email already exit!',
  MAX_REQUEST_OTP:
    'The number of times to verify otp has been exceeded, please contact the administrator!',
  OTP_HAS_EXPIRED: 'Otp has expired',
  WORKSPACE_EXIST: 'Workspace exist!',
  WORKSPACE_NOT_EXIST: 'Workspace not exist!',

  FOLDER_EXIST: 'Folder exist!',
  FOLDER_NOT_EXIST: 'Folder not exist!',
  INVALID_QUERY: 'Invalid query!',
  FILE_NOT_EXIST: 'File not exist!',
  FILE_EXIST: 'File exist!',
} as const;

export const RES_MESSAGE = {
  REGISTER_SUCCESS: 'Register success!',
  LOGIN_SUCCESS: 'Login success',
  LOGOUT_SUCCESS: 'Logout successful',
  REFRESH_SUCCESS: 'Refresh successful',
  SEND_EMAIL_FORGOT_PASSWORD_SUCCESS: 'Send email forgot password success!',
  VERIFY_OTP_SUCCESS: 'Verify otp successfully!',
  RESEND_OTP_SUCCESS: 'Resend otp success!',
} as const;
