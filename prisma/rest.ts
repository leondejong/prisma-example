import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

const port = 3333;

const corsOptions = {
  origin: [
    "http://[::]:3000/",
    "http://[::]:8000/",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://localhost:8000",
  ],
};

app.use(cors(corsOptions));

app.use(express.json());

app.options("*", cors());

app.get("/", async (_request, response) => {
  try {
    return response.json({ name: "REST API" });
  } catch {
    return response.status(500).json({ message: "Failed to fetch data" });
  }
});

app.get("/list", async (_request, response) => {
  try {
    const list = await prisma.item.findMany();
    return response.json({ list });
  } catch {
    return response.status(500).json({ message: "Failed to fetch list" });
  }
});

app.get("/item/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return response.status(404).json({ message: "Item not found" });
    }

    return response.json({ item });
  } catch {
    return response
      .status(500)
      .json({ message: `Failed to fetch item with id: ${id}` });
  }
});

app.post("/item", async (request, response) => {
  try {
    const { name, content, link, active } = request.body;
    const item = await prisma.item.create({
      data: {
        name,
        content,
        link,
        active,
      },
    });

    if (!item) {
      return response
        .status(500)
        .json({ message: "Item could not be created" });
    }

    return response.status(201).json({ item });
  } catch {
    return response.status(500).json({ message: "Item could not be created" });
  }
});

app.put("/item/:id", async (request, response) => {
  const { id } = request.params;
  const { name, content, link, active } = request.body;
  try {
    const exists = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!exists) {
      return response.status(404).json({ message: "Item not found" });
    }

    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: { name, content, link, active },
    });

    return response.json({ item });
  } catch {
    return response
      .status(500)
      .json({ message: `Failed to update item with id: ${id}` });
  }
});

app.patch("/item/:id", async (request, response) => {
  const { id } = request.params;
  const { name, content, link, active } = request.body;
  try {
    const exists = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!exists) {
      return response.status(404).json({ message: "Item not found" });
    }

    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: { name, content, link, active },
    });

    return response.json({ item });
  } catch {
    return response
      .status(500)
      .json({ message: `Failed to update item with id: ${id}` });
  }
});

app.delete("/item/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const exists = await prisma.item.findUnique({
      where: { id: Number(id) },
    });

    if (!exists) {
      return response.status(404).json({ message: "Item not found" });
    }

    const item = await prisma.item.delete({
      where: {
        id: Number(id),
      },
    });

    return response.json({ item });
  } catch {
    return response
      .status(500)
      .json({ message: `Failed to remove item with id: ${id}` });
  }
});

app.get("*", async (_request, response) => {
  return response.status(404).json({ message: "Endpoint not found" });
});

async function main() {
  app.listen(port, () => console.log(`Listening on port: ${port}`));
}

main();
