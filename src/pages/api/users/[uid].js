import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const method = req.method;
  const { uid } = req.query;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(uid) },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      profile_picture: true,
      created_at: true,
      updated_at: true,
      documents: true,
    },
  });
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  switch (method) {
    case "GET":
      try {
        res.status(200).json(user);
        break;
      } catch (e) {
        res.status(400).json(e);
      }

    case "PUT":
      try {
        const data = req.body;
        data.updated_at = new Date();

        const updatedUser = await prisma.user.update({
          where: { id: parseInt(uid) },
          data,
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            profile_picture: true,
            created_at: true,
            updated_at: true,
            documents: true,
          },
        });
        res.status(200).json(updatedUser);
      } catch (e) {
        res.status(400).json(e);
      }
      break;
    case "DELETE":
      try {
        await prisma.user.delete({
          where: { id: parseInt(uid) },
        });
        res.status(200).json({ message: "user deleted" });
      } catch (e) {
        res.status(400).json(e);
      }
      break;

    default:
      res.status(400).json({ message: `${method} method not supported` });
      break;
  }
}
