import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import notFoundError from "./app/middlewares/notFoundError";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from 'cookie-parser';


const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: '*', credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', }));


app.get("/", (req: Request, res: Response) => {
  res.send("QuickMart Server");
});

//application route
app.use('/api', router);



//not found error handler
app.all("*", notFoundError)

//global error handler 
app.use(globalErrorHandler)

export default app;
