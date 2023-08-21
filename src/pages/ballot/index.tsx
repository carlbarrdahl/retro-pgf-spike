import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { BallotSidebar } from "~/components/BallotSidebar";
import { Search } from "~/components/Search";
import { Button } from "~/components/ui/Button";
import { useBallot, useSaveBallot } from "~/hooks/useBallot";
import { projects, useProjects } from "~/hooks/useProjects";
import { DefaultLayout } from "~/layouts";
import { api } from "~/utils/api";

type Project = { id: number; name: string };
export type Allocation = Project & { amount: string };

export default function Ballot({ allocations }: { allocations: Allocation[] }) {
  const form = useForm({
    mode: "onChange",
    defaultValues: { allocations: [] },
  });

  const { data: ballot } = useBallot();

  useEffect(() => {
    if (ballot?.allocations?.length)
      form.setValue("allocations", ballot?.allocations);
  }, [ballot]);
  const save = useSaveBallot();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(save.mutate)}>
        <DefaultLayout rightSidebar={<BallotSidebar />}>
          <h1>Review your ballot</h1>
          <div>
            <BallotForm />
          </div>
        </DefaultLayout>
      </form>
    </FormProvider>
  );
}

const BallotForm = () => {
  const form = useFormContext();
  const { fields, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "allocations", // unique name for your Field Array
  });

  const allocations = (form.watch("allocations") as Allocation[]) ?? [];
  const totalOP = allocations.reduce((sum, x) => (sum += Number(x.amount)), 0);

  return (
    <div>
      {fields.map((project, i) => (
        <div key={project.id} className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200" />
            <h3>{project.name}</h3>
          </div>
          <div className="flex gap-1">
            <input
              type="number"
              step={0.001}
              className="border p-2"
              id={`allocations.${i}.amount`}
              {...form.register(`allocations.${i}.amount`)}
            />

            <Button onClick={() => remove(i)}>Del</Button>
          </div>
        </div>
      ))}

      <div className="my-4 flex justify-end">
        <Button type="submit" color="primary">
          Save
        </Button>
      </div>
      <div className="flex justify-between bg-gray-100 p-4">
        <div>Total</div>
        <div>{totalOP?.toFixed(0)} OP</div>
      </div>
    </div>
  );
};
