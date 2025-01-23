"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  Application,
  City,
  Country,
  ExperienceLevel,
  Status,
  WorkType,
} from "@/lib/global.types";

import {
  deleteApplication,
  updateApplication,
} from "@/lib/actions/my/applications";
import { getStatuses } from "@/lib/actions/master/status";
import { toast } from "sonner";

const statusFormScheme = z.object({
  status_id: z.coerce.number().int(),
});

export const columns: ColumnDef<
  Application & {
    cities: City & {
      countries: Country;
    };
    experienceLevels: ExperienceLevel;
    workTypes: WorkType;
    status: Status;
  }
>[] = [
  {
    id: "Title",
    accessorKey: "title",
    header: () => <span className="font-bold">Title</span>,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Link
          href={`/dashboard/my/applications/${data.id}`}
          className="font-bold"
        >
          <Button variant="link" className="font-bold">
            {data.title}
          </Button>
        </Link>
      );
    },
  },
  {
    id: "Description",
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "Placement",
    accessorKey: "city_id",
    header: "Placement",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <span>
          {data.cities.name} - {data.cities.countries.name}
        </span>
      );
    },
  },
  {
    id: "Experience Level",
    accessorKey: "experience_level_id",
    header: "Experience Level",
    cell: ({ row }) => {
      const data = row.original;

      return <span>{data.experienceLevels.name}</span>;
    },
  },
  {
    id: "Work Type",
    accessorKey: "work_type_id",
    header: "Work Type",
    cell: ({ row }) => {
      const data = row.original;

      return <span>{data.workTypes.name}</span>;
    },
  },
  {
    id: "Status",
    accessorKey: "status_id",
    header: "Status",
    cell: ({ row }) => {
      const data = row.original;
      const form = useForm<z.infer<typeof statusFormScheme>>({
        resolver: zodResolver(statusFormScheme),
        defaultValues: {
          status_id: data.status_id,
        },
      });
      const queryClient = useQueryClient();

      const status = useQuery({
        queryKey: ["status"],
        queryFn: () => getStatuses(),
      });

      const mutation = useMutation({
        mutationFn: ({
          id,
          data,
        }: {
          id: string;
          data: z.infer<typeof statusFormScheme>;
        }) => updateApplication(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["applications"],
          });

          toast("Application updated successfully");
        },
      });

      const onSubmit = async (formData: z.infer<typeof statusFormScheme>) => {
        await mutation.mutateAsync({ id: data.id, data: formData });
      };

      // if (status.isLoading) {
      //   return <span>Loading...</span>;
      // }

      // if (status.isError) {
      //   return <span>Error loading statuses</span>;
      // }

      return (
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status_id"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={data.status.name} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status.data?.map((status) => (
                        <SelectItem
                          key={status.id}
                          value={status.id.toString()}
                        >
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    },
  },
  {
    id: "Last Updated",
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      const date = new Date(data.updated_at);

      return (
        <div className="flex justify-end">
          <span>{date.toDateString()}</span>
        </div>
      );
    },
  },
  {
    id: "Actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const data = row.original;

      const mutation = useMutation({
        mutationFn: (id: string) => {
          return deleteApplication(id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["applications"],
          });
        },
      });

      return (
        <div className="flex justify-end gap-2">
          <AlertDialog>
            <AlertDialogTrigger
              className={buttonVariants({
                size: "icon",
                variant: "destructive",
              })}
            >
              <Trash2 />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this application?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await mutation.mutateAsync(data.id);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href={`/dashboard/my/applications/${data.id}`}>
            <Button variant="outline" size="icon">
              <MoreHorizontal />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
