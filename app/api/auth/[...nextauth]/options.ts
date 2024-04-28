import GoogleProvider from "next-auth/providers/google";
import type { Account, NextAuthOptions, Profile, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "@/services/api/axiosInstance";
import { redirect } from "next/navigation";
import { AdapterUser } from "next-auth/adapters";

interface CustomProfile extends Profile {
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile: async (profile) => {
        const { sub: id, name, email, picture: image } = profile;
        const baseData = { id, name, email, image };
        console.log(profile);
        const data = {
          imageUrl: profile?.picture,
          email: profile.email,
          socialId: id,
          firstname: profile?.given_name,
          lastname: profile?.family_name,
        };

        // try {
        //   const response = await axios.post(
        //     "https://stagingapi.foniso.team/api/v1/auth/social-login",
        //     data
        //   );
        //   console.log(response);
        //   if (response.status === 500 || response.status === 201) {
        //     return redirect("/home");
        //   }
        // } catch (error: any) {}
        // Assuming yourData is fetched correctly and includes necessary User properties
        try {
          const response = await axios.post(
            "https://stagingapi.foniso.team/api/v1/auth/social-login",
            data
          );
          console.log(response);
          // if (response.status === 500 || response.status === 201) {
          //   redirect("/home");
          // } // Fetch or compute additional data here
          return { ...baseData, ...response.data }; // Ensure this object conforms to the User type
        } catch (error: any) {
          console.error("EEEEEEEEEEEEE", error);
          //   if (error?.response?.data.statusCode) {
          //     return (
          //       error?.response?.data.message ?? "Error logging in with Google"
          //     );
          //   }
          // Return a default User object or throw an error
          return {
            ...baseData,
            error:
              error?.response?.data.message ?? "Error logging in with Google",
          }; // Ensure this object conforms to the User type
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("USeeeeeeer: ", user);
      if (!user?.email) {
        throw new Error("No profile");
      }
      if (user === null || !user.id) {
        throw new Error("No provider account id");
      }
      const { error } = user as (User | AdapterUser) & { error: string };
      // Defined by google provider profile callback
      if (!error)
        return `/redirect?udat=${JSON.stringify((user as any)?.data!)}`; // User is good to go
      switch (account?.provider) {
        case "google":
        default:
          return `/login?error=${error}`; // This is where you set your error
      }
    },
  },
};
