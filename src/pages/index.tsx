import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryClient } from "wagmi";
import { BallotSidebar } from "~/components/BallotSidebar";

import { Pagination } from "~/components/Pagination";
import { Button } from "~/components/ui/Button";
import { Divider } from "~/components/ui/Divider";
import { useAddToBallot } from "~/hooks/useBallot";
import {
  useDiscoverFilter,
  useFilter,
  useSetFilter,
} from "~/hooks/useDiscoverFilter";
import { useProjects } from "~/hooks/useProjects";
import { DefaultLayout } from "~/layouts";
import { MobileLayout } from "~/layouts/MobileLayout";

function mergeParams(prev, next) {
  const params = new URLSearchParams({ ...prev, ...next }).toString();
  return `?${params}`;
}

export default function Home() {
  const { query } = useRouter();

  const { data: params = {} } = useFilter("projects");
  const { mutate: setParams } = useSetFilter("projects");
  const projects = useProjects(params);

  // Update the search params with the router query
  // (query is undefined the first render so we can't set as initial searchParams state)
  useEffect(() => {
    setParams({
      page: Number(query.page ?? 1),
      display: (query.display as string) ?? "grid",
    });
  }, [query, setParams]);
  // useEffect(() => {
  //   void router.push(`?${new URLSearchParams(params).toString()}`);
  // }, [params]);
  return (
    <MobileLayout leftSidebar={<BallotSidebar />}>
      <div className="mb-4 flex justify-between">
        <h1 className="text-xl font-bold">Projects</h1>
        <div className="flex gap-2">
          <Button
            // onClick={() => setParams({ display: "list" })}
            as={Link}
            href={mergeParams(params, { display: "list" })}
            color="ghost"
          >
            L
          </Button>
          <Divider orientation={"vertical"} />
          <Button
            // onClick={() => setParams({ display: "grid" })}
            as={Link}
            href={mergeParams(params, { display: "grid" })}
            color="ghost"
          >
            G
          </Button>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mb-4 grid grid-cols-3 gap-4">
        {projects.data?.map((project) => (
          <ProjectGridCard key={project.id} {...project} />
        ))}
      </div>
      <Pagination
        currentPage={params.page}
        buildUrl={(page) => mergeParams(params, { page })}
      />
    </MobileLayout>
  );
}

const ProjectGridCard = ({ id, name }) => {
  const add = useAddToBallot();
  return (
    <div className="relative rounded-[20px] border p-2 ">
      <div className="mb-4 h-28 rounded-2xl bg-gray-200" />
      <div className="space-y-3 p-2">
        <div className="absolute -mt-12 h-16 w-16 rounded-lg border bg-white p-1">
          <div className="flex h-full w-full bg-gray-300" />
        </div>
        <h3 className="pt-4 text-lg font-bold">{name}</h3>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <div className="inline-flex rounded bg-gray-200 p-2 text-xs">
          Collective Governance
        </div>
        {/* <div>
          <Button onClick={() => add.mutate({ id, name, amount: 0 })}>
            Add
          </Button>
        </div> */}
      </div>
    </div>
  );
};
