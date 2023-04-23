declare namespace Express {
  export interface Request {
    session?: {
      authToken?: {
        accessToken: string;
        refreshToken: string;
      };
      res: Response;
    };
    user?: { id: string; username: string };
  }

  export namespace Multer {
    export interface File extends globalThis.Express.Multer.File {}
  }
}
