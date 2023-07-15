import express from "express";

import {
  getStudentsRecords,
  studentRegistration,
  getSingleStudentRecords,
  updateStudentRecords,
  deleteStudentRecords,
  studentLogin,
} from "../controller";

import { isAuthenticated, isOwner } from '../middleware';

export default (router: express.Router) => {
  try {
    router.post("/student", studentRegistration);
    router.get("/student", getStudentsRecords);
    router.get("/student/:id", getSingleStudentRecords);
    router.patch("/student/:id", updateStudentRecords);
    router.delete("/student/:id", deleteStudentRecords);
    router.post("/student/login", studentLogin);
  } catch (error) {
    console.log(error);
  }
};
