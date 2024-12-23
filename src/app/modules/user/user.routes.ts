import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constants';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.get(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.vendor),
    UserControllers.getProfile
);

router.patch(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.vendor),
    multerUpload.single('image'),
    UserControllers.updateProfile
);

router.get(
    '/',
    auth(USER_ROLE.admin),
    UserControllers.getAllUsers,
);

router.patch(
    '/promote/:id',
    auth(USER_ROLE.admin),
    UserControllers.promoteUserToAdmin,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    UserControllers.deleteUser,
);



router.get(
    '/getFollowedUsers',
    // auth(USER_ROLE.admin, USER_ROLE.user),
    UserControllers.getFollowedUsers);

router.get(
    '/getPaidUsers',
    auth(USER_ROLE.admin),
    UserControllers.getPaidUsers,
)

export const UserRoutes = router;