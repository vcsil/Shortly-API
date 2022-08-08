import userRepository from "../repositories/userRepository.js";

async function authEmailValidation(req, res, next) {
    const { email } = req.body;

    try {
        const emailExite = await userRepository.getUserByEmail(email);

        if (emailExite.rowCount > 0) {
            return res.sendStatus(409);
        }

        return next();
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

export default authEmailValidation;
