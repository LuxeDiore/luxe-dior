"use server";
import { currentUser } from "@clerk/nextjs/server";
import User from "../../../database/schema/UserSchema";
import databasesConnect from "@/lib/db";

export async function getAuthStatus() {
  await databasesConnect()
    .then(async () => {
      await currentUser()
        .then(async (user) => {
          if (!user?.id) {
            throw new Error("Invalid user data");
          }
          await User.findOne({
            clerkId: user?.id,
          })
            .then(async (existingUser) => {
              if (!existingUser) {
                await User.create({
                  clerkId: user?.id,
                });
              }
            })
            .catch((error) => {
              console.error("Error:", error.message);
              return { success: false };
            });
        })
        .catch((error) => {
          console.error("Error:", error.message);
          return { success: false };
        });
    })
    .catch((error) => {
      console.error("Error:", error.message);
      return { success: false };
    });

  return { success: true };
}
