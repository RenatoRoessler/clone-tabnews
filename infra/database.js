import { Client } from "pg";

async function query(queryObject) {
  const clinet = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  await clinet.connect();
  const result = await clinet.query(queryObject);
  await clinet.end();
  return result;
}

export default {
  query: query,
};
