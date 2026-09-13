import 'server-only'
import { SessionOptions } from 'iron-session';
 
const secretKey = process.env.SESSION_SECRET;

export interface SessionData {
    userId?: string,
    isLoggedIn: boolean
}

export const defaultSession:SessionData = {
    isLoggedIn: false
}

export const sessionOptions:SessionOptions = {
    password: secretKey!,
    cookieName: "nextjs-session",
    cookieOptions: {
        maxAge: 60 * 60
    }
}
