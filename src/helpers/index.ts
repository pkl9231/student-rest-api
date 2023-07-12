import crypto from "crypto";

const SECRET = "ANTONIO-REST-API";

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");

export const helper = {
  messageResponse: ( statusCode: number, messageResponse: string, data: [], count: number ) => {
    return [{ statusCode }, { messageResponse }, { data }, { count }];
  },
};