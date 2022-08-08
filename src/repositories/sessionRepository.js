import connection from "../database/database.js";

async function createSession(user, token) {
    const userId = user.id;
    return connection.query(
        `INSERT INTO sessions (token, "userId")
         VALUES ($1, $2)`,
        [token, userId]
    );
}

const sessionRepository = {
    createSession,
};

export default sessionRepository;
