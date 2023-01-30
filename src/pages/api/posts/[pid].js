import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const method = req.method;
  const { pid } = req.query;
  const id = parseInt(pid);

  const post = await prisma.document.findFirst({
    where: { id },
  });
  if (!post) {
    res.status(404).json({ message: "document not found" });
  }

  switch (method) {
    case "GET":
      res.status(200).json(post);
    case "PUT":
      const data = req.body;
      data.updated_at = new Date();

      const document = await prisma.document.update({
        where: { id },
        data,
      });
      res.status(200).json(document);

    case "DELETE":
      await prisma.document.delete({
        where: { id },
      });
      res.status(200).json({ message: "document deleted" });

    default:
      res.status(400).json({ message: `${method} method not supported` });
      break;
  }
}
