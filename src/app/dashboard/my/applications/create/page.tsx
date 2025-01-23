"use client";

import React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { getCities } from "@/lib/actions/master/cities";
import { getStatuses } from "@/lib/actions/master/status";
import { getCompanies } from "@/lib/actions/master/companies";
import { getWorkTypes } from "@/lib/actions/master/work-types";
import { getExperienceLevels } from "@/lib/actions/master/experience-levels";

import { createApplication } from "@/lib/actions/my/applications";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const formScheme = z.object({
  title: z.string().min(3).nonempty(),
  description: z.string().min(3).nonempty(),
  city_id: z.coerce.number().int(),
  status_id: z.coerce.number().int(),
  company_id: z.coerce.number().int(),
  work_type_id: z.coerce.number().int(),
  experience_level_id: z.coerce.number().int(),
});

function CreateApplication() {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: "",
      description: "",
      city_id: undefined,
      status_id: undefined,
      company_id: undefined,
      work_type_id: undefined,
      experience_level_id: undefined,
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const [companies, cities, experienceLevels, workTypes, statuses] = useQueries(
    {
      queries: [
        {
          queryKey: ["companies"],
          queryFn: () => getCompanies(),
        },
        {
          queryKey: ["cities"],
          queryFn: () => getCities(),
        },
        {
          queryKey: ["experience-levels"],
          queryFn: () => getExperienceLevels(),
        },
        {
          queryKey: ["work-types"],
          queryFn: () => getWorkTypes(),
        },
        {
          queryKey: ["status"],
          queryFn: () => getStatuses(),
        },
      ],
    }
  );

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formScheme>) => createApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });

      toast("Application created successfully");

      router.replace("/dashboard/my/applications");
    },
  });

  const handleSubmit = async (data: z.infer<typeof formScheme>) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create new application</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Position title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Position description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City placement</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.data?.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name} - {city.countries.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.data?.map((status) => (
                        <SelectItem
                          key={status.id}
                          value={status.id.toString()}
                        >
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <div className="flex gap-2">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies.data?.map((company) => (
                          <SelectItem
                            key={company.id}
                            value={company.id.toString()}
                          >
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger
                        className={buttonVariants({ size: "icon" })}
                      >
                        <Plus />
                      </DialogTrigger>
                    </Dialog>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="work_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workTypes.data?.map((workType) => (
                        <SelectItem
                          key={workType.id}
                          value={workType.id.toString()}
                        >
                          {workType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience_level_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience level</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevels.data?.map((experienceLevel) => (
                        <SelectItem
                          key={experienceLevel.id}
                          value={experienceLevel.id.toString()}
                        >
                          {experienceLevel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default CreateApplication;
