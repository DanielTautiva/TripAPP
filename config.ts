import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: process.env.SQL_PORT,
      password: process.env.SQL_PASSWORD,
      user: process.env.SQL_USERNAME,
    },
    integration: {
      api: process.env.API,
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY
    }
  };
});
