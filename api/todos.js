import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: { title },
    });
    return res.status(201).json(todo);
  }

  res.status(405).end();
}
