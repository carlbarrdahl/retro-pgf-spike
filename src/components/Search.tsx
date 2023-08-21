import { Command } from "cmdk";
import { useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "react-use";
import { useProjects } from "~/hooks/useProjects";
import { Button } from "./ui/Button";

const lists = Array.from({ length: 5 })
  .fill(0)
  .map((_, id) => ({
    id,
    name: `List ${id}`,
  }));

function useLists(params: { query: string }) {
  return useQuery(
    ["lists", params],
    (): Promise<{ id: number; name: string }[]> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            lists.filter((p) =>
              p.name.toLowerCase().includes(params.query.toLowerCase())
            )
          );
        }, 400);
      })
  );
}

export const Search = () => {
  const [active, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useState({ query });

  const projects = useProjects(searchParams);
  const lists = useLists(searchParams);

  useDebounce(() => setSearchParams({ query }), 500, [query]);

  return (
    <div>
      <Button className="md:hidden" onClick={() => setOpen(true)}>
        S
      </Button>
      <div
        className={clsx(
          "absolute left-0 top-0 z-10 flex w-full md:relative md:!flex",
          {
            ["hidden"]: !isOpen,
          }
        )}
      >
        <Button
          onClick={() => setOpen(false)}
          className={clsx("md:hidden", {})}
        >
          &lt;
        </Button>
        <Command
          label="Command Menu"
          className={clsx("md:relative md:w-[500px]")}
        >
          <Command.Input
            value={query}
            onValueChange={setQuery}
            className="block w-full p-2"
            placeholder="Search projects or lists..."
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
          />
          <Command.List
            className={clsx("absolute w-full rounded border bg-white p-2", {
              ["hidden"]: !active,
            })}
          >
            {projects.isLoading || lists.isLoading ? (
              <Command.Loading>Searching...</Command.Loading>
            ) : null}
            {!(projects.data?.length && lists.data?.length) ? (
              <Command.Empty>No results found.</Command.Empty>
            ) : null}
            <Command.Group
              heading="Projects"
              className="uppercase text-gray-600"
            >
              {projects.data?.map((project) => (
                <Command.Item
                  className="p-2 normal-case hover:bg-gray-100"
                  key={project.id}
                >
                  {project.name}
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group heading="Lists" className="uppercase text-gray-600">
              {lists.data?.map((list) => (
                <Command.Item
                  className="p-2 normal-case hover:bg-gray-100"
                  key={list.id}
                >
                  {list.name}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
