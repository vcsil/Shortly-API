import bcrypt from "bcrypt";

import connection from "../database/database.js";

async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function createUser(name, email, password) {
    const passwordHash = bcrypt.hashSync(password, 10);

    return connection.query(
        `INSERT INTO users (name, email, password) 
         VALUES ($1, $2, $3)`,
        [name, email, passwordHash]
    );
}

const userRepository = {
    getUserByEmail,
    createUser,
};

export default userRepository;
