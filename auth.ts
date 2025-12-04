// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { db } from "@/db";
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Came inside authenticate");
//         const { email, password } = credentials as { email: string; password: string };

//         // find user in DB
//         const [user] = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, email as string))
//           .execute();

//         if (!user) return null;

//         // verify password
//         const valid = await bcrypt.compare(password, user.passwordHash);
//         if (!valid) return null;

//         return { id: user.id, email: user.email, name: user.name };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized: async ({ auth }) => {
//       return !!auth;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
// });
