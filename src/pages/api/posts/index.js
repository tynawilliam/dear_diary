import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      try {
        const data = req.body;
        data.created_at = new Date();
        data.updated_at = new Date();
        const new_document = await prisma.document.create({ data });

        res.status(200).json(new_document);
      } catch (e) {
        res.status(400).json({ error: e });
      }

    default:
      res.status(400).json({ message: `${method} method not supported` });
      break;
  }
}
