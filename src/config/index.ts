import 'dotenv/config';

const { MONGOUSER, MONGOPASSWORD, MONGOHOST, MONGOPORT, NODE_ENV, PORT } = process.env;

export const MONGO_URL = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`;

export { NODE_ENV, PORT };
