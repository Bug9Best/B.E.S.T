import express from "express";
const router = express.Router();
import authenticate from 'ldap-authentication'
import createHttpError from "http-errors";

import * as authservice from "./auth.service.js";
import { loginValidate, registerValidate } from "./auth.validate.js";

router.post("/login", async (req, res) => {

    let auth = await authservice.ldapLogin(req.body.email, req.body.password)
    res.json(auth)

//     const data = req.body;

//     // validate data
//     const isValid = await loginValidate.isValid({
//         email: data.email,
//         password: data.password,
//     });
//     if (!isValid) {
//         throw createHttpError.Unauthorized("data invalid");
//     }

//     // login
//     let login = await authservice.login(data.email, data.password);
//     res.json(login);
// } catch (e) {
//     res.status(e.status || 500).json({ message: e.message });
// }

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