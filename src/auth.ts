import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { usuarios } from './db/schema';
import { eq } from 'drizzle-orm'
import { authConfig } from './auth.config';

async function getUser(username: string) {
  try {
    const user = await db.select().from(usuarios).where(eq(usuarios.nombre_usuario, username))
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

          const user = await getUser(username.trim());

          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password ?? '');

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
