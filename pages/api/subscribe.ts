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
    const { emailId } = req.body;

    console.log({ emailId });

    await mongoConnect();
    const subscriber = await Subscriber.findOne({ email: emailId });

    if (subscriber && subscriber._id) {
      return res.status(409).json({
        message: "You are already subscribed to my newsletter. Thanks tho ;)",
      });
    }

    if (!emailId) {
      return res
        .status(400)
        .json({ message: "please provide your email to subscribe" });
    }

    await Subscriber.create({ email: emailId });

    res.status(200).json({
      message: "Thanks for subscribing to my newsletter! Keep reading ;)",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
}
