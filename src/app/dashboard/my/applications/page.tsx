"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getApplications } from "@/lib/actions/my/applications";

import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

function ApplicationsPage() {
  const { data, status } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getApplications(),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return <DataTable columns={columns} data={data} />;
}

export default ApplicationsPage;
