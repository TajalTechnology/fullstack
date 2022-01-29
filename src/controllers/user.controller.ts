import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import UserModel from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from 'lodash';

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response) {
    try {
        const user = await createUser(req.body);
        return res.status(200).json(user);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    };
}
