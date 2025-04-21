'use client';

import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type SimpleUserProps = {
  userId: string;
  imageUrl: string | null;
  fullName: string | null;
  primaryEmailAddress: string | null;
} | null;

export function SidebarUserNav({ user }: { user: SimpleUserProps }) {
  const { setTheme, theme } = useTheme();

  if (!user) {
    return null;
  }

  const userEmail = user.primaryEmailAddress;
  const userImageUrl = user.imageUrl;
  const avatarUrl = userImageUrl || (userEmail ? `https://avatar.vercel.sh/${userEmail}` : '/default-avatar.png');
  const displayName = user.fullName || userEmail || 'User';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent bg-background data-[state=open]:text-sidebar-accent-foreground h-10">
              <Image
                src={avatarUrl}
                alt={`${displayName}'s Avatar`}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="truncate">{displayName}</span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
