import prisma from "../../../../lib/prisma";
import * as bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltOrRounds = 11;
  const hashed_password = await bcrypt.hash(password, saltOrRounds);
  return hashed_password;
}

export default async function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "POST":
      try {
        const { first_name, last_name, email, password } = req.body;
        const userExists = await prisma.user.findFirst({
          where: { email },
        });

        if (!first_name || !last_name || !email || !password) {
          res.status(400).json({ error: "bad request - missing data" });
        }

        if (userExists) {
          res.status(409).json({ error: "This email already exists" });
        }
        const hashed_password = await hashPassword(password);
        const created_at = new Date();
        const updated_at = new Date();
        const newUser = await prisma.user.create({
          data: {
            first_name,
            last_name,
            email,
            hashed_password,
            created_at,
            updated_at,
          },
        });
        const response = {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          profile_picture: newUser.profile_picture,
          created_at: newUser.created_at,
          updated_at: newUser.updated_at,
        };
        res.status(200).json(response);
      } catch (e) {
        res.status(400).json({ error: e });
      }
      break;
    default:
      res.status(400).json({ message: `${method} method not supported` });
      break;
  }
}
