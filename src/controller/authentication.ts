import express from "express";
import { getUserByEmail, createUser } from "../models/models";
import { authentication, random } from "../helpers";
import { HttpStatusCode, MessageResponse } from "../helpers/constants";
import { helper } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");

    if (!user) {
      return res.sendStatus(400);
    }
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie("ANTONIO-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    const errorResponse = [];

    if (!email) {
      errorResponse.push({
        errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
        attributeName: "email",
      });
    }

    if (!password) {
        errorResponse.push({
          errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
          attributeName: "password",
        });
      }

      if (!username) {
        errorResponse.push({
          errorMessage: MessageResponse.MISSING_REQUIRED_FIELD,
          attributeName: "username",
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
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
          errorResponse.push({
            errorMessage: MessageResponse.DATA_EXIST,
            attributeName: "",
          });
          res
            .status(HttpStatusCode.BAD_REQUEST)
            .send(
              helper.errorMessageResponse(
                HttpStatusCode.BAD_REQUEST,
                errorResponse
              )
            );
      return;
    }
    const salt = random();
    const user = await createUser({email, username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    const response = helper.successMessageResponse(HttpStatusCode.OK, MessageResponse.SUCCESS, user );
    res.status(HttpStatusCode.BAD_REQUEST).send(response);
    return;
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
