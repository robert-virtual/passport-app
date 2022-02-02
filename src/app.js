import express from "express";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
const app = express();
const port = 3030 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", users);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`server running on port: ${port}...`);
});
