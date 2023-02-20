const express = require("express");
const cors = require("cors");
const middleware = require("./src/middleware");

const admin = require("./src/config/firebase-config");

const app = express();
const port = 5000;

app.use(cors());

app.get("/", (req, res) => {
  return res.json({
    message: "Test GET success",
  });
});

app.use(middleware.decodeToken);

app.get("/api/users/:emailUser", (req, res) => {
  const { emailUser } = req.params;
  admin
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      const userData = [];
      listUsersResult.users.forEach((userRecord) => {
        if (userRecord.email !== emailUser) {
          userData.push(userRecord.toJSON());
        }
        // console.log(userRecord.toJSON());
      });
      return res.json({
        message: "Get all users success",
        data: userData,
        // data: listUsersResult.users,
      });
    })
    .catch((e) => {
      console.log("Error listing users:", e);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});
app.get("/api/user/:idUser", (req, res) => {
  const { idUser } = req.params;
  admin
    .auth()
    .getUser(idUser)
    .then((userRecord) => {
      return res.json({
        message: "Get all users success",
        data: userRecord.toJSON(),
        // data: listUsersResult.users,
      });
    })
    .catch((e) => {
      console.log("Error listing users:", e);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
