'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ServerStatus } from '@/types/types';

interface FeedbackOptions {
  back?: boolean;
  redirectTo?: string;
  redirectToId?: string;
  refresh?: boolean;
}

export function useServerActionFeedback(
  state: ServerStatus | undefined,
  options: FeedbackOptions = {}
) {
  const router = useRouter();

  useEffect(() => {
    if (state?.success === undefined) return;

    if (state.success) {
      toast.success(state.title ?? 'Éxito', {
        description: state.description,
      });

      if (options.redirectTo) {
        router.push(options.redirectTo);
      } else if (options.back) {
        router.back();
      } else if (options.refresh) {
        router.refresh();
      }

      if (options.redirectToId) {
        router.push(`${options.redirectToId}/${state.returningId}`);
      }
    } else {
      toast.error(state?.title ?? 'Error', {
        description: state?.description ?? 'Ocurrió un problema inesperado.',
      });
    }
  }, [state]);
}
