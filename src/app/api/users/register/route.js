import { User } from "@/model/User";
import { DatabaseConnection } from "@/utils/DatabaseConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { EmailConfiguration } from "@/utils/EmailConfig";

export async function POST(req, res) {
  await DatabaseConnection();
  const data = await req.json();
  const { name, email, password } = data;
  if (!name || !email || !password) {
    return NextResponse.json(
      {
        message: "All Fields are required.",
        status: false,
      },
      { status: 401 }
    );
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return NextResponse.json(
      {
        message: "Email is already used.",
        status: false,
      },
      { status: 400 }
    );
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    name,
    password: hashPassword,
  });
  const savedUser = await user.save();
  await EmailConfiguration({ email, emailType: "VERIFY", user: savedUser._id });
  return NextResponse.json(
    {
      message: "User Registration Successfully!",
      user: savedUser,
      status: true,
    },
    { status: 201 }
  );
}
