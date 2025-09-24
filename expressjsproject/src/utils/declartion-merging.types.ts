import { USerPayloudI } from '../shared/userPayload';
// import { UnifiedApiErrorResponse } from '../middlewares/response.middleware';



export type MyEnvs = {
  PORT: string;
  NODE_ENV: 'development' | 'production' | 'test' ;
  SESSION_SECRET: string;
  JWT_SECRET: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
  namespace Express {
    interface Request {
      user: USerPayloudI;
    }
    // interface Response {
    //   create: (data: object) => this;
    //   ok: (data: object) => this;
    //   error: (err: UnifiedApiErrorResponse) => this;
    // }
  }
}
