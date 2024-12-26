import express from 'express';

import auth from '../../middlewares/auth';

import { multerUpload } from '../../config/multer.config';
import { UserControllers } from './user.controller';


const router = express.Router();

router.get(
    '/me',
    auth("admin"),
    UserControllers.getProfile
);

router.patch(
    '/me',
    auth("admin"),
    multerUpload.single('image'),
    UserControllers.updateProfile
);

router.get(
    '/',
    auth("admin"),
    UserControllers.getAllUsers,
);

router.patch(
    '/promote/:id',
    auth("admin"),
    UserControllers.promoteUserToAdmin,
);

router.delete(
    '/:id',
    auth("admin"),
    UserControllers.deleteUser,
);



router.get(
    '/getPaidUsers',
    auth("admin"),
    UserControllers.getPaidUsers,
)

export const UserRoutes = router;