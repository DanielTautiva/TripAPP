import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    integration: {
      api: process.env.API,
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY
    }
  };
});
