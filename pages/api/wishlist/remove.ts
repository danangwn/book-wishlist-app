import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    console.log('req.body.id', req.body.id);
        await prisma.wishlist.delete({
            where: { id: req.body.id},
        });
    return 'Note created';
    } catch (e) {
        throw e;
    }
}