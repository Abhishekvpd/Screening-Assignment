import { NextRequest, NextResponse } from "next/server";
import { connect } from "~/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "~/models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 },
      );

    const tokenData = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("authToken", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
