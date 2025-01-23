"use client";

import * as React from "react";
import {
  BookOpen,
  GalleryVerticalEnd,
  PieChart,
  BriefcaseBusiness,
  NotebookPen,
  FilesIcon,
  Building2,
  Flag,
  House,
  LandPlot,
  MapPinHouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  team: {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  navMain: [
    {
      title: "Applications",
      url: "/dashboard/my/applications",
      icon: BriefcaseBusiness,
    },
    {
      title: "Todos",
      url: "/dashboard/my/todos",
      icon: NotebookPen,
    },
    {
      title: "Documents",
      url: "/dashboard/my/documents",
      icon: FilesIcon,
    },
  ],
  projects: [
    {
      name: "Companies",
      url: "/dashboard/master/companies",
      icon: Building2,
    },
    {
      name: "Company Types",
      url: "/dashboard/master/company-types",
      icon: PieChart,
    },
    {
      name: "Status",
      url: "/dashboard/master/status",
      icon: Flag,
    },
    {
      name: "Cities",
      url: "/dashboard/master/cities",
      icon: MapPinHouse,
    },
    {
      name: "Countries",
      url: "/dashboard/master/countries",
      icon: LandPlot,
    },
    {
      name: "Work Types",
      url: "/dashboard/master/work-types",
      icon: House,
    },
    {
      name: "Document Types",
      url: "/dashboard/master/document-types",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher team={data.team} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
