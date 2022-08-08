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

        const { rows: url } = urlResult;
        delete url.visitCount;
        delete url.userId;

        return res.send(url);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}
