import express from 'express';
import { HttpStatusCode } from "../helpers/constants";
import { helper } from "../helpers";
import { getStudents, createStudentRecords } from '../models/models';

export const getStudentsRecords = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getStudents();
    let response = helper.successMessageResponse(HttpStatusCode.OK, "success", users?.data, users?.count);
    console.log("getting response", response);
    res.status(HttpStatusCode.OK).send(response);
    return;
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};


export const saveStudentRecords  = async (req: express.Request, res: express.Response) => {
  try {
    const errorResponse = [];
    const { name, className, rollNumber, fathersName, mobile, dateOfAdmission, email } = req?.body;
    if (!name) {
      errorResponse.push({
        errorMessage: "Missing required field",
        attributeName: "name",
      });
    }

    if (!className) {
      errorResponse.push({
        errorMessage: "Missing required field",
        attributeName: "className",
      });
    }

    if (!rollNumber) {
      errorResponse.push({
        errorMessage: "Missing required field",
        attributeName: "rollNumber",
      });
    }

    if (!fathersName) {
      errorResponse.push({
        errorMessage: "Missing required field",
        attributeName: "fathersName",
      });
    }

    if (!mobile) {
      errorResponse.push({
        errorMessage: "Missing required field",
        attributeName: "mobile",
      });
    }

    if (errorResponse?.length) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .send(
          helper.errorMessageResponse(400, errorResponse)
        );
      return;
    }
    const studentRecords = await createStudentRecords(req?.body)
    res.status(HttpStatusCode.CREATED).send(studentRecords);
    return;
  } catch (error) {
    let response = helper.errorMessageResponse(HttpStatusCode.BAD_REQUEST, error);
    res.status(HttpStatusCode.BAD_REQUEST).send(response);
    return;
  }
};