import { User } from "@/model/User";
import { NextResponse } from "next/server";
import { DatabaseConnection } from "@/utils/DatabaseConnection";
DatabaseConnection();
export async function POST(req, res) {
  try {
    const data = await req.json();
    const { token } = data;
    console.log("token>>>>>", token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Verify user successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
