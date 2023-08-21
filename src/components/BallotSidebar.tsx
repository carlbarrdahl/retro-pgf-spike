import Link from "next/link";
import { Button } from "./ui/Button";
import { useBallot } from "~/hooks/useBallot";
import { useAccount, useSignMessage, useSignTypedData } from "wagmi";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInterval } from "react-use";

const votingEnds = Date.now() + 1000 * 3600 * 24 * 4;
export const BallotSidebar = () => {
  const { data: ballot } = useBallot();
  const router = useRouter();
  const { address } = useAccount();

  const submit = api.ballot.submit.useMutation();
  const message = "vote-ballot";
  const { signMessage } = useSignMessage({
    message,
    onSuccess: (signature) => {
      console.log({ signature });
      submit.mutate(
        { address, message, signature },
        {
          onSuccess: ({ success }) => {
            if (success) {
              router.push("/ballot/success");
            }
          },
        }
      );
    },
  });
  function handleSubmitBallot() {
    signMessage();
  }
  function convertDate(date) {
    const now = new Date();
    let diff = Math.abs(now - date) / 1000;

    const days = Math.floor(diff / 86400);
    diff -= days * 86400;

    const hours = Math.floor(diff / 3600) % 24;
    diff -= hours * 3600;

    const minutes = Math.floor(diff / 60) % 60;
    diff -= minutes * 60;

    const seconds = Math.floor(diff % 60);
    return [days, hours, minutes, seconds];
  }

  const VotingEndsIn = () => {
    const [days, hours, minutes, seconds] = convertDate(votingEnds);
    return (
      <div className="flex">{`${days}d:${hours}h:${minutes}m:${seconds}s`}</div>
    );
  };

  return (
    <div className="w-[320px]">
      <div className="space-y-8">
        <h3 className="uppercase text-neutral-600">Your ballot</h3>
        <div>
          <div className="text-neutral-500">Voting ends in</div>
          <VotingEndsIn />
        </div>
        <div className="text-neutral-500">Projects added</div>
        0/200
        <div className="flex justify-between">
          <div className="text-neutral-500">OP allocated</div>0 OP
        </div>
        <div className="flex justify-between">Total 30,000,000 OP</div>
        No projects added yet A nice heading As a badgeholder you are tasked
        with upholding the principle of “impact = profit” - the idea that
        positive impact to the Collective should be rewarded with profit to the
        individual. Badgeholder Manual
      </div>
      <div>Your Ballot</div>
      <div>Projects added</div>
      <div>{ballot?.allocations?.length ?? 0} / 200</div>
      <Button as={Link} href={"/ballot"}>
        View Ballot
      </Button>
      <Button color="primary" onClick={handleSubmitBallot}>
        Submit ballot
      </Button>
    </div>
  );
};
