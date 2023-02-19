declare namespace Express {
  interface Request {
    session?: {
      authToken?: {
        accessToken: string;
        refreshToken: string;
      };
      res: Response;
    };
  }
}
