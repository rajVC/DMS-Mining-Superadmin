import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchData } from "@/lib/request/fetch-data";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const options: NextAuthConfig = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize({ payload, request }: any) {
                const response = await fetchData({
                    url: request,
                    method: "POST",
                    body: JSON.parse(payload),
                });
                if (response?.data) return response.data;
                return null;

            },
        }),
    ],
    callbacks: {
        async signIn() {
            return true;
        },
        jwt: async (params) => {
            const { token, user, trigger }: any = params;
            if (trigger === "update" && params.session) {
                return { ...token, ...params.session };
            }

            if (user) {
               return {
                ...token,
                ...user
               }

            }

            return token;
        },

        async session({ session, token }: any) {
            
            return {
                ...session,
                ...token
            };
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
};


// Optional: You can define UserType if you haven't already, as follows:
export interface UserType {
    id: string;
    email: string;
    password: string; // Adjust the types as necessary
}
