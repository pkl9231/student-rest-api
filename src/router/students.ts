import express from 'express';

import { getStudentsRecords,  saveStudentRecords} from '../controller';
// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/student',  getStudentsRecords);
  router.post('/student',  saveStudentRecords);
};
