import GoogleProvider from "next-auth/providers/google";
import type { Account, NextAuthOptions, Profile } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "@/services/api/axiosInstance";
import { redirect } from "next/navigation";

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
        const data = {
          imageUrl: profile?.picture,
          email: profile.email,
          socialId: id,
          firstname: profile?.name?.split(" ")[0],
          lastname: profile?.name?.split(" ")[1],
        };

        try {
          const response = await axios.post(
            "https://stagingapi.foniso.team/api/v1/auth/social-login",
            data
          );
          console.log(response);
          if (response.status === 500 || response.status === 201) {
            redirect("/home");
          }
        } catch (error: any) {}
        // Assuming yourData is fetched correctly and includes necessary User properties
        try {
          const response = await axios.post(
            "https://stagingapi.foniso.team/api/v1/auth/social-login",
            data
          );
          console.log(response);
          if (response.status === 500 || response.status === 201) {
            redirect("/home");
          } // Fetch or compute additional data here
          return { ...baseData, ...response.data }; // Ensure this object conforms to the User type
        } catch (error: any) {
          console.error(error);
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
      const { error } = user;
      console; // Defined by google provider profile callback
      if (!error) return true; // User is good to go
      switch (account?.provider) {
        case "google":
        default:
          return `/login?error=${error}`; // This is where you set your error
      }
    },
  },
};
