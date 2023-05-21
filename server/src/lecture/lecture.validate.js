import * as yup from "yup";

export const createLectureValidate = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});