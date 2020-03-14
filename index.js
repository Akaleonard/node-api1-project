//Bring express into the project
const express = require("express");

const shortid = require("shortid");

//Create server object
const server = express();

let users = [];

server.listen(4000, () => {
  console.log("listening on port 4000...");
});

server.get("/", (req, res) => {
  res.send("hello world!");
});

server.get("/users", (req, res) => {
  res.status(200).json(users);
});

server.post("/users", (req, res) => {
  const userInfo = req.body;

  userInfo.id = shortid.generate();

  users.push(userInfo);

  res.status(201).json(userInfo);
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const deleted = users.find(user => user.id === id);

  if (deleted) {
    users = users.filter(user => user.id !== id);

    res.status(200).json(deleted);
  } else {
    res.status(404).json({ success: false, message: "user id not found" });
  }
});

server.put("/users/:id", (req, res) => {
  // like with DELETE, we have to get the ID from the URL parameter.
  const { id } = req.params;
  // like with POST, we have to get the body from the req object. This is
  // where the new data is passed by the client.
  const changes = req.body;

  // hubs.findIndex iterates over the array, and looks for one with an id that
  // matches the id passed in by the API caller. If found, index will equal
  // the index of the matching element. If not found, index will be -1.
  let index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    // if index has a real value, replace the element in the array with the
    // changes parsed from the request body, and return it with a success
    // code.
    users[index] = changes;
    res.status(200).json(users[index]);
  } else {
    // if index is -1, return a "not found" code (the id wasn't found in the
    // array).
    res.status(404).json({ success: false, message: "user id not found" });
  }
});

server.patch("/users/:id", (req, res) => {
  // like with DELETE, we have to get the ID from the URL parameter.
  const { id } = req.params;
  // like with POST, we have to get the body from the req object. This is
  // where the new data is passed by the client.
  const changes = req.body;

  // hubs.find() iterates over the array, and looks for one with an id that
  // matches the id passed in by the API caller. If found, "found" will point
  // to the element. If not found, "found" will be unassigned.
  let found = users.find(user => user.id === id);

  // if "found" has a value, it was found in the array, and we use
  // Object.assign() to update it from the req.body object (as noted above).
  // And a 200 success error is returned (with the new object.)
  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
    // if "found" doesn't have a value, it was not found in the array, and we
    // need to return a 404 not found result.
  } else {
    res.status(404).json({ success: false, message: "user id not found" });
  }
});

server.get("/users/:id", (req, res) => {
  const found = users.find(user => user.id === id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ success: false, message: "user id not found" });
  }
});
