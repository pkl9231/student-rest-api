import { StudentModel } from "./student";
import { StudentRequest } from "../data/studentsDataType";

export const getStudents = async () => {
    const data = await StudentModel.find()
    const countResult = await StudentModel.find().countDocuments();
    return {
        data,
        count: countResult
    }
};

export const createStudentRecords = async (studentData: StudentRequest) => {
  const studentRecords = new StudentModel(studentData);
  return await studentRecords.save();
};
