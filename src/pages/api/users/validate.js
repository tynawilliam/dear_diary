import prisma from "../../../../lib/prisma";
import * as bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const method = req.method;
  if (method === "POST") {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.hashed_password);
      if (isMatch) {
        data = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profile_picture: user.profile_picture,
          documents: user.documents,
        };
        res.status(200).json(data);
      } else {
        res.status(401);
      }
    }
  }
}
