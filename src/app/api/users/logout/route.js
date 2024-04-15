import { NextResponse } from "next/server";

export function GET(req, res) {
  try {
  } catch (error) {
    const response = NextResponse.json({
      message: "Logout Successfully!",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
    });
    return response;
  }
}
