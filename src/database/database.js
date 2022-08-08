import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;
const config = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
    config.ssl = {
        rejectUnauthorized: false,
    };
}

const connection = new Pool(config);

export default connection;
