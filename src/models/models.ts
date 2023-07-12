import { StudentModel } from "./student";

export const getStudents = () => StudentModel.find();
