import { NextResponse } from "next/server";

export function GET(req, res) {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successfully!",
        status: true,
      },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
