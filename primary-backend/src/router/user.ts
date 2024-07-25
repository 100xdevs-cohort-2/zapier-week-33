import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { createActivationToken } from "../util/activationToken";
import sendMail from "../util/sendMail";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  const user = {
    name: parsedData.data.name,
    email: parsedData.data.username,
    password: parsedData.data.password,
  };
  console.log(user.email);

  try {
    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    await sendMail({
      email: user.email,
      message: ` Hi <span>${user.name}</span> Your  activation Code is <p>${activationCode} </p> Please activate Your Account  `,
      subject: "Email Verification",
    });

    return res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} `,
      token: activationToken.token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
});

router.post("/verify-user", async (req, res) => {
  try {
    const token = req.body.token;
    const activationCode = req.body.activationCode;

    const decoded: JwtPayload = jwt.verify(token, JWT_PASSWORD) as JwtPayload;
    console.log("decoded", decoded);

    const user = decoded.user;
    // const activationCode = decoded.activationCode as number;
    console.log("user", user);
    console.log("activationCode", activationCode);

    const userExists = await prismaClient.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (userExists) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    const hashedPassword = (await bcrypt.hash(
      user.password,
      10
    )) as unknown as string;
    console.log(hashedPassword);

    await prismaClient.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        isVerified: true,
      },
    });

    return res.status(200).json({ message: " registered successfully" });
  } catch (error) {}
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "Sorry credentials are incorrect",
    });
  }

  // check if user is verified

  if (!user.isVerified) {
    return res.status(403).json({
      message: "Please verify your Email",
    });
  }

  // check if password is correct

  const isPasswordCorrect = await bcrypt.compare(
    parsedData.data.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(403).json({
      message: "Sorry credentials are incorrect",
    });
  }

  // sign the jwt
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    token: token,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // TODO: Fix the type
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRouter = router;
