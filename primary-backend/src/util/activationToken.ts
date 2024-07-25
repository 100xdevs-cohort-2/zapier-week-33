import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

interface IActivationToken {
  token: string;
  activationCode: string;
}
export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    JWT_PASSWORD as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};
