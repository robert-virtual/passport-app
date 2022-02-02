import { Router } from "express";

const auth = Router();

//login
auth.post("/", (req, res) => {
  res.json({ msg: "auth login" });
});
//logout
auth.post("/logout", (req, res) => {
  res.json({ msg: "auth logout" });
});

export default auth;
