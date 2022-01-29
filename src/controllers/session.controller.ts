import { Request, Response } from "express";
import config from "config";
import { createSession, findSession, updateSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import { responce } from '../utils/responce';
import logger from "../utils/logger";


export async function createUserSessionHandler(req: Request, res: Response) {
    try {
        const user = await validatePassword(req.body);
        if (!user) return res.status(401).send(responce.inValidUser);

        const session = await createSession(user._id, req.get("user-agent") || "");

        //create a access token
        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
        );
        console.log('AccessToken', accessToken)

        //create a session token
        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get("refreshTokenTtl") },
        );

        return res.send({ accessToken, refreshToken });

    } catch (e: any) {
        logger.info(e)
    }
};

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;

    const sessions = await findSession({ user: userId, valid: true });
    console.log('41-Session:', sessions)

    return res.send(sessions);
};

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}