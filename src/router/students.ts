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
    router.get("/student", isAuthenticated, getStudentsRecords);
    router.get("/student/:id", isAuthenticated, isOwner, getSingleStudentRecords);
    router.patch("/student/:id", isAuthenticated, isOwner, updateStudentRecords);
    router.delete("/student/:id", isAuthenticated, isOwner, deleteStudentRecords);
    router.post("/student/login", studentLogin);
  } catch (error) {
    console.log(error);
  }
};
