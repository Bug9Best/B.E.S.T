import * as yup from "yup";

export const createLectureValidate = yup.object().shape({
  content: yup.string().required(),
});