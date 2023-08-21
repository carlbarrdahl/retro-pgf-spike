import { useBallot } from "~/hooks/useBallot";
import { DefaultLayout } from "~/layouts";

export default function BallotConfirmed() {
  const { data: ballot } = useBallot();
  return (
    <DefaultLayout>
      <h1 className="text-2xl">Your vote has been received</h1>
      <div>
        Here's how you voted:
        <pre>{JSON.stringify(ballot, null, 2)}</pre>
      </div>
    </DefaultLayout>
  );
}
