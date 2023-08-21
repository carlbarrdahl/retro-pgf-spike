import Link from "next/link";
import { Button } from "./ui/Button";
import { useRouter } from "next/router";

export function Pagination({
  currentPage = 1,
  buildUrl,
}: {
  currentPage: number;
  buildUrl: (page: number) => string;
}) {
  const { query } = useRouter();
  // function buildURL() {
  //   const params = new URLSearchParams(
  //     query as Record<string, string>
  //   ).toString();
  //   return `/${urlPrefix}?${params}`;
  // }
  return (
    <div className="flex justify-end gap-2">
      <Button
        as={Link}
        disabled={currentPage === 1}
        href={buildUrl(currentPage - 1)}
      >
        Prev
      </Button>
      <Button
        as={Link}
        color={currentPage === 1 ? "primary" : "default"}
        href={buildUrl(1)}
      >
        1
      </Button>
      <Button
        as={Link}
        color={currentPage === 2 ? "primary" : "default"}
        href={buildUrl(2)}
      >
        2
      </Button>
      <Button
        as={Link}
        color={currentPage === 3 ? "primary" : "default"}
        href={buildUrl(3)}
      >
        3
      </Button>
      <Button>...</Button>
      <Button as={Link} href={buildUrl(currentPage + 1)}>
        Next
      </Button>
    </div>
  );
}
