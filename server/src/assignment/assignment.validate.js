import * as yup from "yup";

export const createAssignmentValidate = yup.object().shape({
  courseId: yup.string().required(),
  creatorId: yup.string().required(),
  title: yup.string().required(),
  description: yup.string(),
  dueDate: yup.string().required(),
  fileName: yup.string().required(),
  fileUrl: yup.string().required(),
});