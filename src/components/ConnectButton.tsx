import { ConnectButton as RainbowConnect } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/Button";
import { useEnsAvatar, useEnsName } from "wagmi";
export const ConnectButton = () => {
  return (
    <RainbowConnect.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const connected = mounted && account && chain;
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <AccountButton address={account.address} />
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnect.Custom>
  );
};

const AccountButton = ({ address }) => {
  const ens = useEnsName({ address, chainId: 1 });
  const name = ens.data;
  const avatar = useEnsAvatar({
    name,
    chainId: 1,
    enabled: Boolean(name),
    cacheTime: 0,
  });
  return (
    <div className="flex gap-2 rounded-full border p-3">
      <div className="h-6 w-6 overflow-hidden rounded-full">
        <img src={"https://euc.li/webpush.eth"} />
      </div>
      {name}
    </div>
  );
};
