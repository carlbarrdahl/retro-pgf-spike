import { AppProps, type AppType } from "next/app";

import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  persistQueryClientSave,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import "@rainbow-me/rainbowkit/styles.css";
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { optimism } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { api } from "~/utils/api";
import "~/styles/globals.css";

const { chains, publicClient } = configureChains(
  [mainnet, optimism],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : null,
});

persistQueryClientSave({
  queryClient,
  persister,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the RainbowKit Demo",
});

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  console.log("session", pageProps.session);
  return (
    <PersistQueryClientProvider
      persistOptions={{ persister }}
      client={queryClient}
    >
      <WagmiConfig config={wagmiConfig}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider
            enabled={false}
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider chains={chains}>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </PersistQueryClientProvider>
  );
}

export default api.withTRPC(App);
