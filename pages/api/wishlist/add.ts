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
        await prisma.wishlist.create({
            data: { book_id: req.body.id, added_date: 'hari ini'},
        });
    return 'Note created';
    } catch (e) {
        throw e;
    }
}