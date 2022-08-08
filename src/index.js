import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.listen(process.env.PORT, () => {
    console.log(
        chalk.magenta(`Server is listening on port ${process.env.PORT}`)
    );
});
