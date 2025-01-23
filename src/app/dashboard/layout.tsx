import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { AppSidebar } from "@/components/app-sidebar";

import { createClientServer } from "@/lib/supabase/server";

import { getCities } from "@/lib/actions/master/cities";
import { getStatuses } from "@/lib/actions/master/status";
import { getCompanies } from "@/lib/actions/master/companies";
import { getCountries } from "@/lib/actions/master/countries";
import { getWorkTypes } from "@/lib/actions/master/work-types";
import { getCompanyTypes } from "@/lib/actions/master/company-types";
import { getDocumentTypes } from "@/lib/actions/master/document_types";
import { getExperienceLevels } from "@/lib/actions/master/experience-levels";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const supabase = await createClientServer();

  await queryClient.prefetchQuery({
    queryKey: ["status"],
    queryFn: getStatuses,
  });

  await queryClient.prefetchQuery({
    queryKey: ["company-types"],
    queryFn: getCompanyTypes,
  });

  await queryClient.prefetchQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  await queryClient.prefetchQuery({
    queryKey: ["document-types"],
    queryFn: getDocumentTypes,
  });

  await queryClient.prefetchQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  await queryClient.prefetchQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  await queryClient.prefetchQuery({
    queryKey: ["work-types"],
    queryFn: getWorkTypes,
  });

  await queryClient.prefetchQuery({
    queryKey: ["experience-levels"],
    queryFn: getExperienceLevels,
  });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
          </HydrationBoundary>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
