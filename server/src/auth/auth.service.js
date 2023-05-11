import { signAccessToken } from "../utils/jwt.js";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";

export const ldapLogin = async (email, password) => {
    let authenticated = await authenticate({
        ldapOpts: { url: 'ldap://161.246.38.141' },
        userDn: 'it64070146@it.kmitl.ac.th',
        userPassword: 'Best1539..',
        userSearchBase: 'dc=it,dc=kmitl,dc=ac,dc=th',
        usernameAttribute: 'samaccountname',
        username: 'it64070146',
        attributes: ['dn', 'sn', 'cn'],
    })
    return authenticated
}

export const login = async (email, password) => {
    // find username
    const isEmail = await prisma.user.findUnique({
        where: { email: email },
    });
    if (!isEmail) {
        throw createHttpError.Unauthorized("this username not found");
    }
    // check password
    const isPassword = await bcrypt.compare(password, isEmail.password);
    if (!isPassword) {
        throw createHttpError.Unauthorized("password is not match");
    }

    isEmail.password = undefined;

    // convert to jwt
    const accessToken = signAccessToken(isEmail);
    return { ...isEmail, accessToken };
};


export const register = async (email, password, firstName, lastName) => {
    // find username
    const findEmail = await prisma.user.findUnique({
        where: { email: email },
    });

    if (findEmail) {
        throw createHttpError.Unauthorized("this username have alrady");
    }
    // check password
    const hash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName,
        }
    })

    const newProfile = await prisma.profile.create({
        data: {
            userId: newUser.id,
        }
    })

    newUser.password = undefined;
    // convert to jwt
    const accessToken = signAccessToken(newUser);
    return { ...newUser, accessToken };
};