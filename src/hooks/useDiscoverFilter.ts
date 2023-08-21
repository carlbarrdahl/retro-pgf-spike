import { useMutation, useQuery, useQueryClient } from "wagmi";

type Filter = {
  query?: string;
  display?: string;
  page: number;
};

export const initialFilter = { page: 1, display: "grid", query: "" };

type FilterPath = "projects" | "lists";

export const useFilter = (path: FilterPath) => {
  const client = useQueryClient();
  return useQuery(
    ["filter", path],
    () => client.getQueryData<Filter>([path]) ?? initialFilter
  );
};

export const useSetFilter = (path: FilterPath) => {
  const client = useQueryClient();
  return useMutation(async (query: Filter) =>
    client.setQueryData<Filter>(["filter", path], (prev) => ({
      ...prev,
      ...query,
    }))
  );
};

export const toURL = (query: Filter = initialFilter) =>
  new URLSearchParams(query as unknown as Record<string, string>).toString();
