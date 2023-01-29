import prisma from "../../../../lib/prisma";
import * as bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const method = req.method;
  if (method === "POST") {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // res.json(user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.hashed_password);
      if (isMatch) {
        const data = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profile_picture: user.profile_picture,
          documents: user.documents,
        };
        console.log(data);
        res.status(200).json(data);
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    } else {
      res.status(404);
    }
  } else {
    res.status(400).json({ message: `${method} requests not supported` });
  }
}
