import * as yup from "yup";

export const createComment = yup.object().shape({
  content: yup.string().required(),
});