import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode, useState } from "react";
import { ConnectButton } from "~/components/ConnectButton";
import { Dialog } from "~/components/Dialog";
import { Search } from "~/components/Search";
import { Alert } from "~/components/ui/Alert";
import { Button } from "~/components/ui/Button";
import { toURL, useDiscoverFilter, useFilter } from "~/hooks/useDiscoverFilter";

export const MobileLayout = ({
  children,
  leftSidebar,
  rightSidebar,
}: PropsWithChildren & {
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
}) => {
  const router = useRouter();

  const { data: projectsFilter } = useFilter("projects");
  const { data: listsFilter } = useFilter("lists");
  console.log("projects", projectsFilter);
  console.log("lists", listsFilter);
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <main>
      <header className="fixed z-20 flex w-full justify-between bg-white">
        <div className="flex items-center gap-4">
          <Button
            className="md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            M
          </Button>
          <div className="text-2xl font-bold italic text-red-500">OPTIMISM</div>

          <div className="hidden gap-4 md:flex">
            <Link className="p-4" href={`/?${toURL(projectsFilter)}`}>
              Projects
            </Link>
            <Link className="p-4" href={`/lists?${toURL(listsFilter)}`}>
              Lists
            </Link>
          </div>
          <Search />
        </div>
        <div>
          <ConnectButton />
        </div>
      </header>
      <div className="flex gap-4 p-12 pt-24">
        {leftSidebar}
        <div className="flex-1">{children}</div>
        {rightSidebar}
      </div>
      <Dialog
        title={
          <>
            You are not eligible to vote <span className="font-mono">😔</span>
          </>
        }
      >
        <Alert variant="error">
          Only badgeholders are able to vote in RetroPGF. You can find out more
          about how badgeholders are selected{" "}
          <a href="/" target="_blank" className="underline underline-offset-2">
            here
          </a>
          .
        </Alert>
      </Dialog>
      <div
        className={clsx(
          "animate-transform fixed left-0 top-12 h-full w-full bg-white duration-200 ease-in-out sm:hidden",
          {
            ["translate-x-full"]: !isMenuOpen,
          }
        )}
      >
        <div className="flex flex-col">
          <Link className="p-4" href={"/"}>
            Projects
          </Link>
          <Link className="p-4" href={"/lists"}>
            Lists
          </Link>
        </div>
      </div>
    </main>
  );
};
