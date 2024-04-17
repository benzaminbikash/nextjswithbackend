import { User } from "@/model/User";
import { getUserData } from "@/utils/getUserData";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  const data = await getUserData();
  const user = await User.findById({ _id: data }).select(
    "-password -isVerified"
  );
  return NextResponse.json(
    { message: "Single User Info", data: user, status: true },
    { status: 200 }
  );
}
