declare namespace Express {
    type User={
        id: string;
    }
    export interface Request {
      user?: User; // Replace `any` with a specific user type if you have one
    }
  }