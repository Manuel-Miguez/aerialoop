import 'dotenv/config';
import { dirname } from 'path';

const Environment = {
  api: {
    port: Number(process.env.API_PORT) || 3030,
    env: process.env.NODE_ENV || '',
  },
  tmp: {
    path: dirname(require.main!.filename) + '/tmp',
  },
};

export default Environment;
