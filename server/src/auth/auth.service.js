import { signAccessToken } from "../utils/jwt.js";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";
import { authenticate } from 'ldap-authentication'

export const ldapLogin = async (username, password) => {
    // let user = await authenticate({
    //     ldapOpts: { url: 'ldap://161.246.38.141' },
    //     userDn: username + '@it.kmitl.ac.th',
    //     userPassword: password,
    //     userSearchBase: 'dc=it,dc=kmitl,dc=ac,dc=th',
    //     usernameAttribute: 'samaccountname',
    //     username: username,
    //     attributes: ['dn', 'sn', 'cn'],
    // })
    let data = { username: username, password: password };
    return data;
}

// export const register = async (email, password, firstName, lastName) => {
//     // find username
//     const findEmail = await prisma.user.findUnique({
//         where: { email: email },
//     });

//     if (findEmail) {
//         throw createHttpError.Unauthorized("this username have alrady");
//     }
//     // check password
//     const hash = await bcrypt.hash(password, 10)

//     const newUser = await prisma.user.create({
//         data: {
//             email: email,
//             password: hash,
//         }
//     })

//     newUser.password = undefined;
//     // convert to jwt
//     const accessToken = signAccessToken(newUser);
//     return { ...newUser, accessToken };
// };