import { Router } from "express";
import prisma from "../prisma";

const router = Router();

// GET /todos
router.get("/", async (_req, res) => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(todos);
});

// POST /todos
router.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  const todo = await prisma.todo.create({
    data: { title },
  });

  res.status(201).json(todo);
});

// PATCH /todos/:id
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body;

  const todo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  res.json(todo);
});

// DELETE /todos/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.todo.delete({
    where: { id },
  });

  res.status(204).end();
});

export default router;
