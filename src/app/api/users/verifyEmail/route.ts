import { NextResponse } from "next/server";
import { connect } from "~/dbConfig/dbConfig";
import UserOtp from "~/models/userOtpModel";
import User from "~/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, otp } = reqBody;
    const userVerification = await UserOtp.findOne({ email });

    if (!userVerification)
      return NextResponse.json(
        { error: "Email does not exist or has been verified already" },
        { status: 400 },
      );
    else if (userVerification.expiresAt < Date.now()) {
      await UserOtp.deleteOne({ email });
      return NextResponse.json(
        { error: "OTP has been expired, please try again" },
        { status: 400 },
      );
    } else {
      const isOtpValid = await bcryptjs.compare(otp, userVerification.otp);
      if (!isOtpValid)
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      await User.updateOne({ email }, { isVerified: true });
      await UserOtp.deleteMany({ email });
      return NextResponse.json(
        { message: "Email has been verified", success: true},
        { status: 200 },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
