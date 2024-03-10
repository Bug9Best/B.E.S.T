import * as yup from "yup";

export const createLectureValidate = yup.object().shape({
  content: yup.string().required(),
  fileName: yup.string().required(),
  fileUrl: yup.string().required(),
});