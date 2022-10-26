import { Express, Request, Response, NextFunction, Router } from 'express';
import { handleGoogleAuth } from './controllers/sessionsController';
import { router } from './routes/api';
import apiMySQLRouter from './routes/apiMySQL';
import session from 'express-session'
declare module "express-session" {
    interface SessionData {
        user: string;
    }
}
import connectRedis from 'connect-redis'
import dotenv from 'dotenv'
dotenv.config();
import Redis from 'ioredis'
import cors from 'cors'
import { getCurrentUser } from './service/sessionService'


const routes = async (app: Express) => {
    // setup UpStash client and Redis store 
    const RedisStore = connectRedis(session);

    const client = new Redis(`rediss://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`)

    app.use(cors())

    // set session cookie
    app.use(session({
        store: new RedisStore({ client }),
        secret: process.env.REDIS_SECRET as string,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.ENVIRONMENT === 'production' ? true : 'auto',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        }
    }))

    app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

    app.get('/api/oauth/google', handleGoogleAuth)

    app.use('/api/sql/postgres', router)

    app.use('/api/sql/mysql', apiMySQLRouter)

    app.use('/api/me', getCurrentUser)

    app.get('/api/logout', (res: Response, req: Request) => {
        req.session.destroy((err) => {
            res.redirect('http://localhost:8080/login')
        })
    })

    // Global Error Handler
    app.use((err: ErrorEvent, req: Request, res: Response, next: NextFunction) => {
        const defaultErr = {
            log: 'Express error handler caught unknown middleware error',
            status: 500,
            message: 'An error occurred. This is the global error handler.',
        };
        const errorObj = Object.assign({}, defaultErr, err);
        return res.status(errorObj.status).json(errorObj.message);
    });

}

export default routes;