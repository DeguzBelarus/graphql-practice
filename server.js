const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const graphqlSchema = require("./schemas/graphql");

let users = [{ id: 1, username: "Anton", age: 30 }];

const rootResolver = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    users.push({ id: Date.now(), ...input });
    return users;
  },
  updateUser: ({ id, input }) => {
    users = users.map((user) => {
      if (user.id == id) {
        return { ...user, ...input };
      } else return user;
    });
    return users;
  },
  deleteUser: ({ id }) => {
    users = users.filter((user) => user.id != id);
    return users;
  },
};

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: graphqlSchema,
    rootValue: rootResolver,
  })
);

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
);
