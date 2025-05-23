import { Request, Response } from 'express';
import * as Yup from 'yup';

type Tregister = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const validateRegisterSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), ""], 'Passwords must match')
});

export default {
    async register(req: Request, res: Response) {
        const {
            fullName,
            username,
            email,
            password,
            confirmPassword
        } = req.body || {} as Tregister;
        try {
            await validateRegisterSchema.validate({
                fullName,
                username,
                email,
                password,
                confirmPassword
            }) 
            res.status(200).json({
                message: 'User registered Succesfully',
                data: {
                    fullName,
                    username,
                    email,
                }
            });
        } catch (error) {
            const err = error as unknown as Error;
            res.status(400).json({
                message: err.message,
                data: null
            });
        }
    }
}