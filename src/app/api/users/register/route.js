import { DatabaseConnection } from "@/utils/DatabaseConnection";
import { NextResponse } from "next/server";

DatabaseConnection();
export async function POST(req, res) {
  const data = await req.json();

  return NextResponse.json(
    {
      message: "User Registration Successfully!",
      data,
    },
    { status: 201 }
  );
}
