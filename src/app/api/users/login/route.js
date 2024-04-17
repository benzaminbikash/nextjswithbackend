import { User } from "@/model/User";
import { DatabaseConnection } from "@/utils/DatabaseConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

DatabaseConnection();
export async function POST(req, res) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 200 }
      );
    }
    const user = await User.findOne({ email });

    const comparepassword = await bcrypt.compare(password, user.password);
    if (user && comparepassword) {
      if (user.isVerified) {
        const token = jsonwebtoken.sign({ _id: user.id }, process.env.SECRET, {
          expiresIn: "1d",
        });
        const userData = await User.findById(user._id).select("-password");

        const response = NextResponse.json(
          {
            message: "Login Successfully.",
            token,
            data: userData,
            status: true,
          },
          { status: 200 }
        );
        // set cookie
        response.cookies.set("token", token, {
          httpOnly: true,
        });
        return response;
      }
      return NextResponse.json(
        { message: "Your account is not verified." },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid User or Password." },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
