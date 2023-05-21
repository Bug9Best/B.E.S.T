import { signAccessToken } from "../utils/jwt.js";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";
import { authenticate } from "ldap-authentication";

export const ldapLogin = async (username, password) => {
  let user = await authenticate({
      ldapOpts: { url: 'ldap://161.246.38.141' },
      userDn: username + '@it.kmitl.ac.th',
      userPassword: password,
      userSearchBase: 'dc=it,dc=kmitl,dc=ac,dc=th',
      usernameAttribute: 'samaccountname',
      username: username,
      attributes: ['dn', 'sn', 'cn'],
  })
  let data = { username: username, password: password };
  return data;
};

export const loginWithCredentials = async (username, password) => {
  // find username
  const findUsername = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!findUsername) {
    throw createHttpError.Unauthorized("this username not found");
  }

  findUsername.password = undefined;
  // convert to jwt
  const token = signAccessToken(findUsername);
  return { user: { ...findUsername }, token: token };
};