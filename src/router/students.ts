import express from "express";

import {
  getStudentsRecords,
  saveStudentRecords,
  getSingleStudentRecords,
  updateStudentRecords,
  deleteStudentRecords,
} from "../controller";

// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  try {
    router.post("/student", saveStudentRecords);
    router.get("/student", getStudentsRecords);
    router.get("/student/:id", getSingleStudentRecords);
    router.patch("/student/:id", updateStudentRecords);
    router.delete("/student/:id", deleteStudentRecords);
  } catch (error) {
    console.log(error);
  }
};
