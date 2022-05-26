import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../libs/fb";
import { RatingDocument } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = firebase.firestore();

  if (req.method === "GET") {
    const docs: RatingDocument[] = [];

    (await db.collection("/ratings").get()).docs.forEach((doc) => {
      docs.push(doc.data() as RatingDocument);
    });

    return res.status(200).json({ data: docs, status: 200 });
  }

  if (req.method === "POST") {
    const doc = req.body;

    await db.collection("/ratings").add(doc);

    return res.status(201).json({ data: doc, status: 201 });
  }

  res.status(405).json({ status: 405 });
}
