import * as yup from "yup";

export const createCourseValidate = yup.object().shape({
  code: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
});