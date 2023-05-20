import * as yup from "yup";

export const createCourseValidate = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});