const express = require("express");
const shortid = require("shortid");
const server = express();
server.use(express.json());

let users = [
  {
    id: 1,
    name: "Lincoln",
    bio: "Golden Doodle",
  },
  {
    id: 2,
    name: "Angel",
    bio: "German Shephard",
  },
  {
    id: 3,
    name: "Mollie",
    bio: "Cocker Spaniel",
  },
];

server.get("/", (req, res) => {
  res.send("Hello From Express");
});

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id == id);
  console.log(user);

  if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ message: " The User With The Specified ID Does Not Exist" });
  }
});

server.post("/api/users", (req, res) => {
  const usersInfo = req.body;
  //   console.log("here is usersInfo", usersInfo);
  usersInfo.id = shortid.generate();
  if (users.name && users.bio) {
    users.push(usersInfo);
    res.status(201).json(usersInfo);
  } else {
    res
      .status(400)
      .json({ message: "Please Provide Name and Bio For The User" });
  }
});
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const found = users.find((dog) => dog.id === id);
  console.log(id);
  console.log(users);
  console.log(found);

  if (found) {
    users = users.filter((dog) => dog.id !== id);
    res.status(200).json({ message: "deleted" });
    console.log(users);
  } else {
    res.status(404).json({ message: "Dog Not Found" });
  }
});

server.patch("api/users/id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  let found = users.find((dog) => dog.id === id);

  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "Object not found" });
  }
});

server.listen(5000, () => console.log("server is running "));
