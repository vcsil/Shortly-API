import connection from "../database/database.js";

async function createShortURL(url, shortURL, userId) {
    return connection.query(
        `INSERT INTO URLS(url, "shortUrl", "userId")
         VALUES ($1, $2, $3)`,
        [url, shortURL, userId]
    );
}

const urlRepository = {
    createShortURL,
};

export default urlRepository;
