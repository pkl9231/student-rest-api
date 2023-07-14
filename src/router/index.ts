import express from 'express';
import students from './students';

const router = express.Router();

export default (): express.Router => {
students(router);
  return router;
};