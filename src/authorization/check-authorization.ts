import { isDemo } from '@/middleware';
import { redirect } from 'next/navigation';
import { getServerSession } from './get-server-session';

export async function checkAuthorization() {
  if (!isDemo) {
    const { user } = await getServerSession();
    if (!user) {
      redirect('/auth/login');
    }
    if (user.role === 'none') {
      redirect('/auth/unauthorized');
    }
  }
}
