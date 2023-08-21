import { useQuery } from "@tanstack/react-query";
import { initialFilter } from "./useDiscoverFilter";

export const projects = Array.from({ length: 17 })
  .fill(0)
  .map((_, id) => ({
    id,
    name: `Project ${id}`,
  }));

export function useProjects({
  page = 1,
  limit = 5,
  query = "",
}: {
  page?: number;
  limit?: number;
  query?: string;
} = initialFilter) {
  // const { page = 1, limit = 5 } = params;
  return useQuery(
    ["projects", { page, limit, query }],
    (): Promise<{ id: number; name: string }[]> =>
      new Promise((resolve) => {
        setTimeout(() => {
          const start = (page - 1) * 5;
          const end = start + limit;
          console.log(start, end);
          resolve(
            projects
              .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
              .slice(start, end)
          );
        }, 400);
      })
  );
}
