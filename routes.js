const express = require("express");
const { NotFoundError } = require("./errorHandling");
const { User } = require("./userMethods");
const router = new express.Router();

router.post("/", async function (req, res, next) {
  const { name, email, age } = req.body;
  User.createUser({ name, email, age });
  return res.json({
    createdUser: name,
  });
});

router.get("/", async function (req, res, next) {
  const users = await User.getUsersArray();
  return res.json({ users });
});

router.get("/:name", async function (req, res, next) {
  const name = req.params.name;
  const usersArr = await User.getUsersArray();
  const user = usersArr.find((user) => user.name === name);
  if (!user) {
    throw new NotFoundError("User does not exist.");
  }
  return res.json({ user });
});

router.patch("/:name", async function (req, res, next) {
  const prevName = req.params.name;
  const newName = req.body.name;
  const usersArr = await User.getUsersArray();
  const idx = usersArr.findIndex((user) => user.name === prevName);
  if (idx === -1) {
    throw new NotFoundError("User does not exist");
  }
  await User.editUser(idx, newName);
  return res.json({ changed_from: prevName, changed_to: newName });
});

router.delete("/:name", async function (req, res, next) {
  const usersArr = await User.getUsersArray();
  const name = req.params.name;
  const idx = usersArr.findIndex((user) => user.name === name);
  if (idx === -1) {
    throw new NotFoundError("User does not exist");
  }
  await User.deleteUser(idx);
  return res.json({ deleted: name });
});

module.exports = router;
