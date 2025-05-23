import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { currentUser } from '@clerk/nextjs/server';
import Script from 'next/script';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // Create a plain object with only serializable props needed by client components
  const simpleUserProps = user
    ? {
        userId: user.id,
        imageUrl: user.imageUrl,
        fullName: user.fullName,
        primaryEmailAddress: user.primaryEmailAddress?.emailAddress ?? null,
      }
    : null;

  const [cookieStore] = await Promise.all([cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={simpleUserProps} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
