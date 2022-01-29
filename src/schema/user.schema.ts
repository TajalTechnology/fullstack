import { object, string, TypeOf } from "zod";
import { responce } from '../utils/responce'

export const createUserSchema = object({
    body: object({

        name: string({ required_error: responce.string }),
        password: string({ required_error: responce.string }),
        passwordConfirmation: string({ required_error: responce.string }),
        email: string({ required_error: responce.string }).email(responce.emailNotValid),

    }).refine((data) => data.password === data.passwordConfirmation, {
        message: responce.unMatching,
        path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;