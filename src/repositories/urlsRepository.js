import connection from "../database/database.js";

async function createShortURL(url, shortURL, userId) {
    return connection.query(
        `INSERT INTO URLS(url, "shortUrl", "userId")
         VALUES ($1, $2, $3)`,
        [url, shortURL, userId]
    );
}

async function getURLById(id) {
    return connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

const urlRepository = {
    createShortURL,
    getURLById,
};

export default urlRepository;
