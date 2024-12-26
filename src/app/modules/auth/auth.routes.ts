import express from 'express';

import { authControllers } from './auth.controller';



const router = express.Router();

router.post(
    '/signup',
    authControllers.signUp
);

router.post(
    '/login',
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