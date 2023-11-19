import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod"

const userSchema = z
  .object({
    userName: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })
   
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userName,email , password } = userSchema.parse(body)
    // check if email already exists
    const checkUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (checkUserByEmail) {
      return NextResponse.json(
        { user: null, message: "user already exists with this emial" },
        { status: 409 }
      );
    }
    // check if userName already exists
    const checkUserByName = await db.user.findUnique({
      where: { userName: userName },
    });

    if (checkUserByName) {
      return NextResponse.json(
        { user: null, message: "user already exists with this userName" },
        { status: 409 }
      );
    }

    //  new user
    const safePassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        userName,
        password: safePassword,
      },
    });
    // not sending password to database
    const { password: newUserPass, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "new user create" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
};
