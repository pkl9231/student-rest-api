import crypto from "crypto";

const SECRET = "STUDENT-REST-API";

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");

export const helper = {
  successMessageResponse: ( statusCode: number, messageResponse: string, data: any, count?: number ) => {
    return { statusCode ,  messageResponse , count, data  };
  },
  errorMessageResponse: ( statusCode: number, error: any ) => {
    return { statusCode , error };
  },
};
