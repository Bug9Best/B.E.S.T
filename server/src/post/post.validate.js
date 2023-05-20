import * as yup from "yup";

export const createPost = yup.object().shape({
  content: yup.string().required(),
});