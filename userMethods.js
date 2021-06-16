const fsP = require("fs").promises;
const { NotFoundError } = require("./errorHandling");

class User {
  static async getUsersArray() {
    const usersObj = await fsP.readFile("users.json", "utf-8");
    const users = JSON.parse(usersObj);
    return users.users;
  }

  static async createUser(newUser) {
    console.log(newUser);
    const usersArr = await this.getUsersArray();
    usersArr.push(newUser);
    const usersJSON = JSON.stringify({ users: usersArr });
    try {
      await fsP.writeFile("users.json", usersJSON, "utf-8");
    } catch (err) {
      console.log("Unable to add to file");
    }
  }

  static async getUserByName(name) {
    const usersArr = await this.getUsersArray();
    console.log(usersArr);
    return usersArr.find((user) => user.name === name);
  }

  static async editUser(prevName, newName) {
    const usersArr = await this.getUsersArray();
    const idx = usersArr.findIndex((user) => user.name === prevName);
    usersArr[idx].name = newName;
    const usersJSON = JSON.stringify({ users: usersArr });
    try {
      await fsP.writeFile("users.json", usersJSON, "utf-8");
    } catch (err) {
      console.log(err.status, "Unable to edit");
    }
  }

  static async deleteUser(idx) {
    const usersArr = await this.getUsersArray();
    usersArr.splice(idx, 1);
    const usersJSON = JSON.stringify({ users: usersArr });
    try {
      await fsP.writeFile("users.json", usersJSON, "utf-8");
    } catch (err) {
      console.log(err.status, "Unable to delete");
    }
  }
}

module.exports = { User };
