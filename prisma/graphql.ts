import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const prisma = new PrismaClient();

const port = 4444;

type Data = {
  id: number;
  name: string;
  content: string;
  link: string;
  active: boolean;
};

type Item = Data & {
  created: Date;
  updated: Date;
};

const typeDefs = `#graphql
  scalar DateTime
  type Item {
    id: ID!
    name: String!
    content: String!
    link: String!
    active: Boolean!
    created: DateTime!
    updated: DateTime!
  }
  type Query {
    getList: [Item]!
    getItem(id: ID): Item
  }
  type Mutation {
    addItem(name: String, content: String, link: String, active: Boolean): Item
    updateItem(
      id: ID
      name: String
      content: String
      link: String
      active: Boolean
    ): Item
    removeItem(id: ID): Item
  }
`;

const resolvers = {
  Query: {
    getList: async () => prisma.item.findMany(),
    getItem: async (_: Object, data: Data) => {
      const { id } = data;
      return prisma.item.findUnique({
        where: { id: Number(id) },
      });
    },
  },
  Mutation: {
    addItem: async (_: Object, data: Data) => {
      const { name, content, link, active } = data;
      return prisma.item.create({
        data: {
          name,
          content,
          link,
          active,
        },
      });
    },
    updateItem: async (_: Object, data: Data) => {
      const { id, name, content, link, active } = data;
      return prisma.item.update({
        where: { id: Number(id) },
        data: { name, content, link, active },
      });
    },
    removeItem: async (_: Object, data: Data) => {
      const { id } = data;
      return prisma.item.delete({
        where: {
          id: Number(id),
        },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
