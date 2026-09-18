"use server";

import * as v from "valibot";
import { FormState, SignupFormSchema } from "../lib/definitions"
import bcrypt from "bcrypt";
import { db } from "@/src/prisma/db";
import { getIronSession } from "iron-session";
import { defaultSession, SessionData, sessionOptions } from "../lib/sessions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
    const validatedFields = v.safeParse(SignupFormSchema, {
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // Validate form fields
    if(!validatedFields.success) {
        return {
            errors: v.flatten<typeof SignupFormSchema>(validatedFields.issues)
        }
    }

    const {email, password} = validatedFields.output;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the provider or db to create a user...
    try {
        await db.orm.public.User.create({
        email: email,
        password: hashedPassword
    })
    } catch(error) {
        console.log(error);
        return {
            message: "An error occurred while creating your account."
        }
    }

    redirect("/login")
}

export async function getSession() {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

    if(!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn
    }

    return session;
}

export async function login(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
    const validatedFields = v.safeParse(SignupFormSchema, {
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // Validate form fields
    if(!validatedFields.success) {
        return {
            errors: v.flatten<typeof SignupFormSchema>(validatedFields.issues)
        }
    }

    const {email, password} = validatedFields.output;
    const user = await db.orm.public.User.select("id", "password", "role").where({ email: email }).first()
    
    if(!user) {
        return {
            message: "Invalid credentials"
        }
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        return {
            message: "Invalid credentials"
        }
    }

    const session = await getSession();
    session.userId = String(user.id)
    session.userRole = user.role
    session.isLoggedIn = true
    await session.save();

    redirect(user.role === "ADMIN" ? "/dashboard" : "/profile");
}

export async function logout() {
    const session = await getSession()
    session.destroy()

    redirect("/")
}