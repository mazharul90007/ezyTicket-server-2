import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  jwt_token: process.env.JWT_SECRET_TOKEN,
  store_id: process.env.STORE_ID,
  store_pass: process.env.STORE_PASS,
  server: process.env.server,
  client: process.env.client,
  stripe_secret_key: process.env.TRIPE_SECRET_KEY,
};
