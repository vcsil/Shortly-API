import { v4 as uuid } from "uuid";

import userRepository from "../repositories/userRepository.js";

export default async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        await userRepository.createUser(name, email, password);

        return res.sendStatus(201);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}
