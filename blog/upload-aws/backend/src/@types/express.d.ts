declare namespace Express {
  export interface Request {
    file: {
      filename: string;
      name: string;
      size: number;
      destination: string;
      originalname: string;
      path: string;
    };
  }
}