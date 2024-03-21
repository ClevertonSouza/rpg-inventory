import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/database/database";

import * as yup from "yup";

const schema = yup.object().shape({
  token: yup.string().required("O token é obrigatório"),
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  try {
    await schema.validate(token);

    await prisma.playerToken.create({
      data: {
        token,
      },
    });
    return res.status(200).json({ success: "Player token created" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
