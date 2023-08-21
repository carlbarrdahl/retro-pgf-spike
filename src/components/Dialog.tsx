import React, { PropsWithChildren, ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Button } from "./ui/Button";

export const Dialog = ({
  title,
  children,
}: { title: ReactNode } & PropsWithChildren) => (
  <RadixDialog.Root>
    <RadixDialog.Trigger asChild>
      <button>Edit profile</button>
    </RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-md" />
      <RadixDialog.Content className="fixed left-1/2 top-1/2 z-10 max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6">
        <RadixDialog.Title className="mb-6 text-2xl font-bold">
          {title}
        </RadixDialog.Title>
        {children}

        <RadixDialog.Close asChild className="absolute right-8 top-6">
          <Button color="ghost" aria-label="Close">
            &times;
          </Button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);
