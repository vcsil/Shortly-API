import urlRepository from "../repositories/urlsRepository.js";
import userRepository from "../repositories/userRepository.js";

export async function getUserById(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (id !== user.id) {
        return res.sendStatus(401);
    }

    try {
        const visitResult = await urlRepository.getVisitCountByUser(id);
        const [visitCount] = visitResult.rows;

        const urlsResult = await urlRepository.getURLSByUser(id);
        const userUrls = urlsResult.rows;

        return res
            .send({
                id: user.id,
                name: user.name,
                visitCount: visitCount.sum || 0,
                shortenedUrls: userUrls,
            })
            .status(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getRanking(req, res) {
    try {
        const result = await userRepository.getUrlsRankingByUser();

        return res.send(result.rows);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
