const { write } = require("fs");
const { read, hashPasswd } = require("../utils/model");

module.exports = {
  POST: async (req, res) => {
    try {
      const admins = read("admin");
      let { username, password } = await req.body;
      password = hashPasswd(password);
      const findedUser = admins.find(
        (user) => user.username === username && user.password === password
      );

      if (!findedUser) {
        throw new Error("Invalid username or password");
      }

      res.json(200, { status: 200, message: "Succesfully logged" });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
};
