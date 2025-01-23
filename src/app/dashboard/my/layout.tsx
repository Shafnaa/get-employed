import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getTodos } from "@/lib/actions/my/todos";
import { getDocuments } from "@/lib/actions/my/documents";
import { getApplications } from "@/lib/actions/my/applications";

async function MyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  await queryClient.prefetchQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export default MyLayout;
