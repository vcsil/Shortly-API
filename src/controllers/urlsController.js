import { nanoid } from "nanoid";
import urlRepository from "../repositories/urlsRepository.js";

export default async function shortenURL(req, res) {
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
