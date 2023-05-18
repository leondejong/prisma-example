import { PrismaClient } from "@prisma/client";
import express, { Response } from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

function failure(
  response: Response,
  error: string | Error,
  status: number = 500
) {
  response.status(status);
  response.json(error);
}

app.get("/", async (_, response) => {
  try {
    const index = "REST API";
    response.json(index);
  } catch {
    failure(response, "Failed to display index");
  }
});

app.get("/list", async (_, response) => {
  try {
    const list = await prisma.item.findMany();
    response.json(list);
  } catch {
    failure(response, "Failed to fetch list");
  }
});

app.get("/item/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
    });
    response.json(item);
  } catch {
    failure(response, `Failed to fetch item with id: ${id}`);
  }
});

app.post(`/item`, async (request, response) => {
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
    response.json(item);
  } catch {
    failure(response, "Failed to add item");
  }
});

app.put("/item/:id", async (request, response) => {
  const { id } = request.params;
  const { name, content, link, active } = request.body;
  try {
    const item = await prisma.item.update({
      where: { id: Number(id) },
      data: { name, content, link, active },
    });
    response.json(item);
  } catch {
    failure(response, `Failed to update item with id: ${id}`);
  }
});

app.delete(`/item/:id`, async (request, response) => {
  const { id } = request.params;
  try {
    const item = await prisma.item.delete({
      where: {
        id: Number(id),
      },
    });
    response.json(item);
  } catch {
    failure(response, `Failed to remove item with id: ${id}`);
  }
});

app.get("*", async (_, response) => {
  failure(response, "Endpoint not found", 404);
});

async function main() {
  app.listen(3333, () => console.log("http://127.0.0.1:3333"));
}

main();
