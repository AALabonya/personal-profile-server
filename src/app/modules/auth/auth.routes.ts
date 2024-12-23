import express from 'express';
import validate from '../../middlewares/validate';

import { authControllers } from './auth.controller';
import { authValidation } from './auth.validation';


const router = express.Router();

router.post(
    '/signup',
    // validate(userValidations.createUserZod),
    authControllers.signUp
);

router.post(
    '/login',
    validate(authValidation.loginZod),
    authControllers.login
);

router.post(
    '/refresh-token',
    authControllers.refreshToken,
);

router.post(
    '/forget-password',
    authControllers.forgetPassword,
);

router.post(
    '/reset-password',
    authControllers.resetPassword,
);


export const authRoutes = router; 