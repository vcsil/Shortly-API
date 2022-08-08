import sessionRepository from "../repositories/sessionRepository.js";
import userRepository from "../repositories/userRepository.js";

export default async function validateToken(req, res, next) {
    // conferir header
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.send(401).status("Não enviou token.");
    }

    try {
        const { rows: sessions } = await sessionRepository.getSessionByToken(
            token
        );
        const [session] = sessions;
        if (!session) {
            return res.send(401).send("Não existe sessão.");
        }

        const { rows: users } = await userRepository.getUserById(
            session.userId
        );
        const [user] = users;
        if (!user) {
            return res.send(401).send("Usuário não encontrado");
        }

        res.locals.user = user;
        return next();
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}
