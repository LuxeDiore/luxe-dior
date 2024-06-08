"use server";
import { currentUser } from "@clerk/nextjs/server";
import User from "../../../database/schema/UserSchema";
import databasesConnect from "@/lib/db";

export async function getAuthStatus() {
  await databasesConnect();
  const user = await currentUser();

  if (!user?.id || !user.emailAddresses[0].emailAddress) {
    throw new Error("Invalid user data");
  }
  let existingUser = await User.findOne({
    clerkId: user?.id,
  });

  if (!existingUser) {
    existingUser = await User.findOne({
      emailAddress: user.emailAddresses[0].emailAddress,
    });

    if (!existingUser) {
      const newUser = await User.create({
        clerkId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        emailAddress: user.emailAddresses[0].emailAddress,
      });
    }
  }

  return { success: true };
}
