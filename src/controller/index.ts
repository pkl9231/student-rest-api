import express from 'express';
import { HttpStatusCode, MessageResponse } from "../helpers/constants";
import { helper } from "../helpers";
import { getStudents, createStudent, getStudentById, updateStudentById, deleteStudentById } from '../models/models';

/**
 * this function is use to save student records
 * @param req.body 
 * @returns
 */
export const saveStudentRecords  = async (req: express.Request, res: express.Response) => {
  try {
    const errorResponse = [];
    const { name, className, rollNumber, fathersName, mobile, dateOfAdmission, email } = req?.body;
    if (!name) {
      errorResponse.push({
        errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
        attributeName: "name",
      });
    }

    if (!className) {
      errorResponse.push({
        errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
        attributeName: "className",
      });
    }

    if (!rollNumber) {
      errorResponse.push({
        errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
        attributeName: "rollNumber",
      });
    }

    if (!fathersName) {
      errorResponse.push({
        errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
        attributeName: "fathersName",
      });
    }

    if (!mobile) {
      errorResponse.push({
        errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
        attributeName: "mobile",
      });
    }

    if (errorResponse?.length) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .send(
          helper.errorMessageResponse(HttpStatusCode.BAD_REQUEST, errorResponse)
        );
      return;
    }
    const studentRecords = await createStudent(req?.body)
    res.status(HttpStatusCode.CREATED).send(studentRecords);
    return;
  } catch (error) {
    const response = helper.errorMessageResponse(HttpStatusCode.BAD_REQUEST, error);
    res.status(HttpStatusCode.BAD_REQUEST).send(response);
    return;
  }
};

/**
 * this function is use to get all student records
 * @returns
 */
export const getStudentsRecords = async (req: express.Request, res: express.Response) => {
  try {
    const result = await getStudents();
    const response = helper.successMessageResponse(HttpStatusCode.OK, MessageResponse.SUCCESS, result, result?.length);
    res.status(HttpStatusCode.OK).send(response);
    return;
  } catch (error) {
    console.log(error);
    const response = helper.errorMessageResponse(HttpStatusCode.BAD_REQUEST, error);
    res.status(HttpStatusCode.BAD_REQUEST).send(response);
    return;
  }
};

/**
 * this function is use to get single student records
 * @param id
 * @returns
 */
export const getSingleStudentRecords = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const result = await getStudentById(id);
    const httpCode = result?.length ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND;
    const messageResponse = result?.length ? MessageResponse.SUCCESS : MessageResponse.NO_CONTENT;
    const response: any = helper.successMessageResponse(httpCode, messageResponse, result, result?.length);
    res.status(httpCode).send(response);
    return;
  } catch (error) {
    const response = helper.errorMessageResponse(HttpStatusCode.BAD_REQUEST, error);
    res.status(HttpStatusCode.BAD_REQUEST).send(response);
    return;
  }
}

 /**
 * this function is use to update student records
 * @param id
 * @returns
 */
 export const updateStudentRecords = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const result = await updateStudentById(id, req?.body);
    const httpCode = result ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST;
    const messageResponse = result ? MessageResponse.SUCCESS : MessageResponse.NO_CONTENT;
    const response: any = helper.successMessageResponse(httpCode, messageResponse, result );
    res.status(httpCode).send(response);
    return;
  } catch (error) {
    const response = helper.errorMessageResponse(HttpStatusCode.BAD_REQUEST, error);
    res.status(HttpStatusCode.BAD_REQUEST).send(response);
    return;
  }
};


/**
 * this function is use to delete student records
 * @param id
 * @returns
 */
export const deleteStudentRecords = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const result = await deleteStudentById(id);
    const httpCode = result ? HttpStatusCode.ACCEPTED : HttpStatusCode.BAD_REQUEST;
    const messageResponse = result ? MessageResponse.SUCCESS : MessageResponse.NO_CONTENT;
    const response: any = helper.successMessageResponse(httpCode, messageResponse, result );
    res.status(httpCode).send(response);
  } catch (error) {
    const response = helper.errorMessageResponse(HttpStatusCode.BAD_REQUEST, error);
    res.status(HttpStatusCode.BAD_REQUEST).send(response);
    return;
  }
}