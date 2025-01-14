import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";

const webhookSecret: string = process.env.WEBHOOK_SECRET!;
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" && id) {
    const privateCurrency = await prisma.currency.create({
      data: {
        amount: 1000,
      },
    });

    const bettor = await prisma.bettor.create({
      data: {
        id,
        name: evt.data.first_name + " " + evt.data.last_name,
        email: evt.data.email_addresses[0]?.email_address || "",
        privateCurrencyId: privateCurrency.id,
      },
    });

    res.status(201).json({ bettor });
  }

  if (eventType === "session.created") {
    res.status(201).json({});
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
