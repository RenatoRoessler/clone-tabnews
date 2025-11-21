import { Client } from "pg";

async function query(queryObject) {
  let clinet;
  try {
    clinet = await getNewClient();
    const result = await clinet.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await clinet.end();
  }
}

async function getNewClient() {
  const clinet = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: getSSLValues(),
  });

  await clinet.connect();
  return clinet;
}

export default {
  query,
  getNewClient,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
