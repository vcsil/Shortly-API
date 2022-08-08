import { nanoid } from "nanoid";
import urlRepository from "../repositories/urlsRepository.js";

export async function shortenURL(req, res) {
    const { id } = res.locals.user;
    const { url } = req.body;

    const shortURL = nanoid(8);

    try {
        await urlRepository.createShortURL(url, shortURL, id);
        return res.status(201).send({ shortURL });
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export async function getURLById(req, res) {
    const { id } = req.params;
    try {
        const urlResult = await urlRepository.getURLById(id);
        if (urlResult.rowCount === 0) {
            return res.sendStatus(404);
        }

        const url = urlResult.rows[0];
        delete url.visitCount;
        delete url.userId;
        delete url.createdAt;

        return res.send(url);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const result = await urlRepository.getByShortURL(shortUrl);
        if (result.rowCount === 0) {
            return res.sendStatus(404);
        }
        const [url] = result.rows;
        await urlRepository.addURLVisitCount(url.id);

        return res.redirect(url.url);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function deleteURL(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const urlExiste = await urlRepository.getURLById(id);
        if (urlExiste.rowCount === 0) {
            return res.sendStatus(404);
        }
        const url = urlExiste.rows[0];
        if (url.userId !== user.id) {
            return res.sendStatus(401);
        }

        await urlRepository.deleteURL(id);

        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}
