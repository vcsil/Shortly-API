import connection from "../database/database.js";

async function createSession(user, token) {
    const userId = user.id;
    return connection.query(
        `INSERT INTO sessions (token, "userId")
         VALUES ($1, $2)`,
        [token, userId]
    );
}

async function getSessionByToken(token) {
    return connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
}

const sessionRepository = {
    createSession,
    getSessionByToken,
};

export default sessionRepository;
