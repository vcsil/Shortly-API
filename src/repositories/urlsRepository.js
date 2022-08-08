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

async function deleteURL(id) {
    return connection.query(`DELETE FROM urls WHERE id=$1`, [id]);
}

async function getByShortURL(shortUrl) {
    return connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [
        shortUrl,
    ]);
}

async function addURLVisitCount(urlId) {
    return connection.query(
        `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`,
        [urlId]
    );
}

async function getVisitCountByUser(userId) {
    return connection.query(
        `SELECT SUM(urls."visitCount") FROM urls WHERE urls."userId" = $1`,
        [userId]
    );
}

async function getURLSByUser(userId) {
    return connection.query(`SELECT * FROM urls WHERE urls."userId" = $1`, [
        userId,
    ]);
}

const urlRepository = {
    createShortURL,
    getURLById,
    deleteURL,
    getByShortURL,
    addURLVisitCount,
    getVisitCountByUser,
    getURLSByUser,
};

export default urlRepository;
