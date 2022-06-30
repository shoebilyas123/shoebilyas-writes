import type { NextApiRequest, NextApiResponse } from "next";
import Subscriber from "./../../model/subscriber";
import mongoConnect from "./../../lib/mongoConnect";

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return subscribe(req, res);
  } else {
    return res.status(500).send("method not allowed");
  }
}

async function subscribe(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { email, name } = req.body;

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

    await Subscriber.create({ email, name });

    res.status(200).json({
      message: `Welcome aboard ${name}! Thanks for subscribing to my newsletter! Keep reading ;)`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}
