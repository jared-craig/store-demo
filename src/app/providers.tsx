'use client';

import { ReduxProvider } from '@/components/ReduxProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
