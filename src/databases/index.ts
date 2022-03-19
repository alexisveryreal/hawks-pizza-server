import { MONGO_URL, MONGOUSER, MONGOPASSWORD, MONGOHOST, MONGOPORT } from '@/config';

if (!MONGO_URL) {
  throw new Error('Please add the MONGO_URL environment variable');
}

export const dbConnection = {
  url: `mongodb+srv://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`,
  options: {
    dbName: 'test',
  },
};
