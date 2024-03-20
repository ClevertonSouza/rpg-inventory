'use server'

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"
import { AuthError } from "next-auth"

export const login = async (values: any) => {

    if (!values.email || !values.password) {
        return {
            error: 'Please fill in all fields'
        }
    }

    try {
        const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        }).then((res) => {
            console.log(res)
        })

        return { success: "User logged in" }
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                error: 'Invalid email or password'
            }
        }

        return {
            error: 'Something went wrong!'
        }
    }

    return {}
}

