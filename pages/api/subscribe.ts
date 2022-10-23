import type { NextApiRequest, NextApiResponse } from "next";
import Subscriber from "shoebilyas-common/model/subscriber";
import mongoConnect from "shoebilyas-common/lib/mongoConnect";
import { sendNewSubscriberEmail, sendUnsubscribeEmail } from "../../lib/email";
import { IEmailParams } from "shoebilyas-common/interface/email";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    return subscribe(req, res);
  } else if (req.method === "PUT") {
    return unsubscribe(req, res);
  } else {
    return res.status(500).json({ message: "method not allowed" });
  }
}

async function subscribe(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { email, name } = req.body;

    console.log({ email, name });

    await mongoConnect();
    const subscriber = await Subscriber.findOne({ email, name });

    if (subscriber && subscriber._id) {
      return res.status(409).json({
        message: "You are already subscribed to my newsletter. Thanks tho ;)",
      });
    }
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email!" });
    }

    if (!name) {
      return res.status(400).json({ message: "Please enter a name!" });
    }

    const newsub = await Subscriber.create({ email, name });

    await sendNewSubscriberEmail({
      to: email,
      name,
      // @ts-ignore-next-line
      id: newsub?._id || "",
    });

    res.status(200).json({
      message: `Welcome aboard ${name}! Thanks for subscribing to my newsletter! Keep reading ;)`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}

async function unsubscribe(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { id } = req.body;
    console.log({ id });

    await mongoConnect();
    const sub = await Subscriber.findById(id);

    const email: string = sub.email || "";
    const name: string = sub.name || "";

    await Subscriber.deleteOne({ email });

    const payload: IEmailParams = { to: email, name };
    await sendUnsubscribeEmail(payload);

    res.status(200).json({
      message: `Hi ${name}! You have been unsubscribed. Sorry to see you go but keep reading :).`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}
