import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../libs/fb";
import { RatingDocument, VinmonopoletProductWithImage } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = firebase.firestore();

  let doc: RatingDocument | null = null;

  (
    await db.collection("/ratings").where("id", "==", req.query.id).get()
  ).docs.forEach((_doc) => {
    doc = _doc.data() as RatingDocument;
  });

  res.status(200).json({ data: doc, status: 200 });
}
