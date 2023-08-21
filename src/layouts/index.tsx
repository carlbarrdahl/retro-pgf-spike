import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";
import { Search } from "~/components/Search";

export const DefaultLayout = ({
  children,
  leftSidebar,
  rightSidebar,
}: PropsWithChildren & {
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
}) => (
  <main>
    <header className="flex justify-between">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold italic text-red-500">OPTIMISM</div>

        <div className="flex gap-4">
          <Link className="p-4" href={"/"}>
            Projects
          </Link>
          <Link className="p-4" href={"/lists"}>
            Lists
          </Link>
        </div>
        <Search />
      </div>
      <div>
        <ConnectButton />
      </div>
    </header>
    <div className="flex gap-4 p-12">
      {leftSidebar}
      <div className="flex-1">{children}</div>
      {rightSidebar}
    </div>
  </main>
);
