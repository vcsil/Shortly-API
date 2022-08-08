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

async function getUserById(id) {
    return connection.query(`SELECT * FROM users WHERE id = $1;`, [id]);
}

async function getUrlsRankingByUser() {
    return connection.query(`
    SELECT users.id, users.name, COUNT(urls.id) as "linksCount", SUM(urls."visitCount") as "visitCount"
    FROM urls 
    JOIN users ON urls."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `);
}

const userRepository = {
    getUserByEmail,
    createUser,
    getUserById,
    getUrlsRankingByUser,
};

export default userRepository;
