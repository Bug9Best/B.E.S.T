import * as yup from "yup";

export const loginValidate = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const registerValidate = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
})
