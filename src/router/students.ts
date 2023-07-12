import express from 'express';

import { getStudentsRecords } from '../controller';
// import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/student',  getStudentsRecords);
  // router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  // router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
};
