import express from 'express';

import { getStudents } from '../models/models';

export const getStudentsRecords = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getStudents();
    res.status(200).send(users);
    return;
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};