import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sql } from "@/app/lib/db";
 
async function getUser(username) {
  try {
    const user = await sql`SELECT * FROM "Usuarios" WHERE "Nombre_usuario"=${username}`;
    return user[0];
  } catch (error) {
    console.error('El usuario no existe:', error);
    throw new Error('El usuario no existe');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;

          const user = await getUser(username);
          
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.Password);
 
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});