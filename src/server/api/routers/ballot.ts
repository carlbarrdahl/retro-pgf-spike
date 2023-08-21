import { type VerifyMessageParameters, verifyMessage } from "viem";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ballotRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        address: z.string(),
        message: z.string(),
        signature: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { address, message, signature } = input;
      const success = await verifyMessage({
        address,
        message,
        signature,
      } as VerifyMessageParameters);
      // Verify address is badgeholder
      // Check if user has voted
      // Store votes in db
      // await ctx.prisma.ballot.create({
      //   data: {
      //     owner: address,
      //     signature,
      //     // votes
      //   },
      // });
      return { success };
    }),
});
