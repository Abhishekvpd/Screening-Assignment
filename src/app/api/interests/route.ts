import { faker } from "@faker-js/faker";
import { NextRequest, NextResponse } from "next/server";
import Interest from "~/models/interestsModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "~/models/userModel";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams).get("page");

  const pageSize = 6;
  const pageNumber = searchParams ? searchParams : "1";
  const skip = (Number(pageNumber) - 1) * pageSize;

  try {
    const interests = await Interest.find().skip(skip).limit(pageSize);
    const total = await Interest.countDocuments();

    const userId = getJwtData(request);
    const user = await User.findOne({ _id: userId });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    const selectedInterests = user.interests || [];

    const userInterests = interests.map((interest) => ({
      id: interest._id,
      interest: interest.interest,
      checked: selectedInterests.includes(interest.id),
    }));

    return NextResponse.json(
      {
        interests: userInterests,
        page: pageNumber,
        totalPages: Math.ceil(total / pageSize),
        totalRecords: total,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const reqBody: { id: string; checked: boolean } = await request.json();
  const { id, checked } = reqBody;
  //   const cookie = request.cookies.get("authToken")?.value!;
  try {
    const userId = getJwtData(request);
    const user = await User.findOne({ _id: userId });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    const userInterests = user.interests || [];
    user.interests = [...userInterests, id];
    if (checked) user.interests = [...userInterests, id];
    else user.interests = userInterests.filter((interest) => interest !== id);
    await user.save();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    if (error.message === "jwt expired")
      return NextResponse.json(
        { error: "Token expired, please signin again" },
        { status: 401 },
      );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const getJwtData = (request: NextRequest) => {
  const cookie = request.cookies.get("authToken")?.value!;
  const data = jwt.verify(cookie, process.env.TOKEN_SECRET!) as JwtPayload;
  return data.id;
};
