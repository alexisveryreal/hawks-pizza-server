import { MONGO_URL } from '@/config';

if (!MONGO_URL) {
  throw new Error('Please add the MONGO_URL environment variable');
}

export const dbConnection = {
  url: MONGO_URL,
  options: {
    dbName: 'test',
  },
};
