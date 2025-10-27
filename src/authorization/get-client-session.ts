import { authClient } from '@/lib/auth-client';

export function getClientSession() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return { session, user };
}
