"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function TeamSwitcher({
  team,
}: {
  team: {
    name: string;
    logo: React.ElementType;
    plan: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <Button size="lg" className="w-full p-2" variant="ghost">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <team.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{team.name}</span>
              <span className="truncate text-xs">{team.plan}</span>
            </div>
          </Button>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
