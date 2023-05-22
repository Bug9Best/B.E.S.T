import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as authservice from "./auth.service.js";
import { loginValidate, registerValidate } from "./auth.validate.js";

router.post("/loginCred", async (req, res) => {
  try {
    const data = req.body;
    let user = await authservice.loginWithCredentials(data.username, data.password);
    res.json(user);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    let user = await authservice.ldapLogin(data.username, data.password);

    let arrayResult = user.dn.split(",");
    let username = data.username;
    let password = data.password;
    let email = data.username.slice(2) + "@it.kmitl.ac.th";
    let fullname = arrayResult[0].slice(3);
    let generation = arrayResult[1].slice(3);
    let degree = arrayResult[2].slice(3);
    let role = arrayResult[3].slice(3);

    let newUser = await authservice.createUser(username, password, email, fullname, generation, degree, role);
    res.json(newUser);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    // validate data
    const isValid = await registerValidate.isValid(data);
    if (!isValid) {
      throw createHttpError.Unauthorized("data invalid");
    }
    // login
    const register = await authservice.register(data.email, data.password, data.firstName, data.lastName);
    res.json(register);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
});

export default router;
