import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Twilio } from "twilio";


const sendTwilioMsg = async (number: string, info: string) => {
  // const sendTwilioMsg = async (number: string, info: string) => {
  // const accountSid = "AC5f16522c86a6a0b9f579e94beb3d700f";
  // const authToken = "f07b77817a1c240d003500534bc84e95";
  // const twilioNumber = "+18556437904";
  const accountSid = process.env.TWILIO_ACC_SID;
  const authToken = process.env.TWILIO_AUTH;
  const twilioNumber = process.env.TWILIO_NUM;
  // const myNumber = "+15712694598";
  const myNumber = number;
  console.log(number, info)

  if (accountSid && authToken && myNumber && twilioNumber) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const client= new Twilio(accountSid, authToken);
    // from: twilioNumber,
    // to: myNumber,
    // to: '+17706347153',
    // from: '+18885649555',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await client.messages
      .create({
        from: '+16206589732',
        to: number,
        body: info,
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .then((message) => console.log(message.sid, message.errorMessage));
  } else {
    console.error(
      "You are missing one of the variables you need to send a message"
    );
  }
};
export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  sendMessage: publicProcedure
    .input(z.object({ textMessage: z.string() }))
    .mutation(async ({ input }) => {
      await sendTwilioMsg("+14437224218", input.textMessage);
      // return grandparent;
      return;
    }),
  sendMessageWithNumber: publicProcedure
    .input(z.object({ textMessage: z.string(), phoneNumber: z.string() }))
    .mutation(async ({ input }) => {
      await sendTwilioMsg(input.phoneNumber, input.textMessage);
      // return grandparent;
      return;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
