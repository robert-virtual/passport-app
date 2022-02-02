import { Router } from "express";
import Prisma from "@prisma/client";
import { hash } from "argon2";
const { PrismaClient } = Prisma;

const users = Router();
const prisma = new PrismaClient();

// obtener todos los usuarios
users.get("/", async (req, res) => {
  const users = await prisma.users.findMany();
  res.json({ users, msg: "obtener todos los usuarios" });
});

// obtener un usuario
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({ where: { id } });
  res.json({ user, msg: "obtener un usuario" });
});

// crear un usuario // registro
users.post("/", async (req, res) => {
  let { password, birthday } = req.body;
  try {
    password = await hash(password);
    birthday = new Date(birthday);
    const user = await prisma.users.create({
      data: { ...req.body, password, birthday },
    });
    res.json({ user, msg: "crear un usuario // registro" });
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

// actualizar informacion de usuario
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.update({
    where: { id },
    data: { ...req.body },
  });
  res.json({ user, msg: "actualizar informacion de usuario" });
});

// borrar un usuario // registro
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.users.delete({ where: { id } });
  res.json({ msg: "borrar un usuario // registro" });
});

export default users;
