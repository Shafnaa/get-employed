"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>My</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <>
            <SidebarMenuItem key={item.title}>
              <Link href={item.url}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
