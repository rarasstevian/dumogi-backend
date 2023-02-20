const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");

const admin = require("../src/config/firebase-config");

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
// const email = "rarasstevian@gmail.com";
// app.get("/api/users/:email", (req, res) => {
//   const { email } = req.params;
//   try {
//     admin
//       .auth()
//       .getUserByEmail(email)
//       .then((userRecord) => {
//         res.json({
//           message: "Get user success",
//           data: userRecord,
//         });
//       })
//       .catch((e) => {
//         res.status(404).json(e);
//       });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error: error });
//   }
// });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
