"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "../database/mongoose";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
}

// READ
export async function getUserById(clerkId: string) {
  try {
    await connectDB();
    const user = User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found!");
    }

    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectDB();

    const updatedUser = User.findOneAndUpdate({ clerkId }, user, {
      new: true, // will return the newly updated data
    });

    if (!updatedUser) {
      throw new Error("User update failed");
    }

    return updatedUser ? JSON.parse(JSON.stringify(updatedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectDB();

    const userToDelete = await User.findOne({ clerkId: clerkId });

    if (!userToDelete) {
      throw new Error("User not found!");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);

    revalidatePath("/");

    return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
