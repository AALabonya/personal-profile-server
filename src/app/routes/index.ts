import express from 'express';

import { projectRoutes } from '../modules/Project/project.route';
import { blogRoutes } from '../modules/Blog/blog.route';

import { experienceRoutes } from '../modules/Experience/experience.route';
import { authRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/User/user.routes';
import skillRoute from '../modules/Skills/skill.route';



const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
},
{
    path: '/blogs',
    route: blogRoutes,
},
{
    path: '/skills',
    route: skillRoute,
},
{
    path: '/experience',
    route: experienceRoutes,
},

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
