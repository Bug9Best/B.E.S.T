import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import auth from "./auth/auth.controller.js";
import course from "./course/course.controller.js";
import assignment from "./assignment/assignment.controller.js";
import post from "./post/post.controller.js";
import comment from "./comment/comment.controller.js";
import enrollment from "./enrollment/enrollment.controller.js";
import user from "./user/user.controller.js";
import chat from "./chat/chat.controller.js";

import testSocket from "./testSocket/index.js";
import { connectSocket } from "./socket/index.js";

const port = 8080;
const app = express();
const router = express.Router();

connectSocket();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(
  "/api",
  router.use("/auth", auth),
  router.use("/testSocket", testSocket),
  router.use("/course", course),
  router.use("/assignment", assignment),
  router.use("/enrollment", enrollment),
  router.use("/post", post),
  router.use("/comment", comment),
  router.use("/user", user),
  router.use("/chat", chat)
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
