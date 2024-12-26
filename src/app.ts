/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import routes from './app/routes';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

app.use(
  cors({
    origin: ['https://dasboard-admin-tau.vercel.app','https://portfolio-frontend-three-plum.vercel.app','http://localhost:3000','http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use('/api', routes);

//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Welcome to the Personal Website API',
  });
});

//global error handler
app.use(globalErrorHandler);

//handle not found
// app.use(notFound);

export default app;
