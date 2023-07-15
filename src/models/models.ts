import { StudentModel, UserModel } from "./student";
import { StudentRequest } from "../data/studentsDataType";

export const getStudents = async () => {
    return await StudentModel.find()
};

export const createStudent = async (studentData: StudentRequest) => {
  const studentRecords = new StudentModel(studentData);
  return await studentRecords.save();
};

export const getStudentById = async (_id: string) => {
  return await StudentModel.find({ _id });
};

export const updateStudentById = async (_id: string, data: StudentRequest) => {
  return await StudentModel.findByIdAndUpdate(_id, data, {new: true,});
};

export const deleteStudentById = async (id: string) => {
  return await StudentModel.findOneAndDelete({ _id: id })
};

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });

export const deleteUser = async (email: string) => {
  return await UserModel.findOneAndDelete({ email: email })
};