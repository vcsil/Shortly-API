import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import userRepository from "../repositories/userRepository.js";
import sessionRepository from "../repositories/sessionRepository.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        await userRepository.createUser(name, email, password);

        return res.sendStatus(201);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export async function singIn(req, res) {
    const { email, password } = req.body;

    try {
        const { rows: users } = await userRepository.getUserByEmail(email);
        const [user] = users;

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await sessionRepository.createSession(user, token);
            return res.status(200).send(token);
        }

        return res.status(401).send("Senha ou email incorretos!");
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}
