import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Allocation } from "~/pages/ballot";

export function useBallot() {
  const queryClient = useQueryClient();
  return useQuery(
    ["ballot"],
    async () =>
      queryClient.getQueryData<{ allocation: Allocation[] }>(["ballot"]) ?? {}
  );
}
export function useSaveBallot() {
  const queryClient = useQueryClient();

  return useMutation(async (ballot: Allocation[]) =>
    queryClient.setQueryData(["ballot"], ballot)
  );
}

export function useAddToBallot() {
  const queryClient = useQueryClient();

  return useMutation(async (project: Allocation) =>
    queryClient.setQueryData(["ballot"], (ballot) => {
      console.log("add", ballot, project);
      return { allocations: (ballot.allocations ?? []).concat(project) };
      // ballot.concat(project);
    })
  );
}
