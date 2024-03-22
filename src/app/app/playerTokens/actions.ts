'use server'

import { PlayerToken } from "@/common/types";
import prisma from "@/lib/database/database";

import { auth } from "@/auth";

export async function createPlayerToken(data: Omit<PlayerToken, "id">) {
  const authSession = await auth();
  const user = authSession?.user;

  if (!user) {
    return {
      error: "User not found",
    };
  }

  try {
    await prisma.playerToken.create({
      data: {
        ...data,
        userId: user.id as string,
      },
    });
    return {
      success: "Player token created successfully",
    };
  } catch (error) {
    return {
      error: "Error creating player token",
    };
  }
}


export async function listAllPlayerTokens() {
  const authSession = await auth();
  const user = authSession?.user;

  if (!user) {
    console.log("User not found");
  }

  try {
    const data = await prisma.playerToken.findMany({
      where: {
        userId: user?.id as string,
      },
    });
    return {
      data,
    };
  } catch (error) {
    console.log("Error listing player tokens", error);
  }

  return {
    data: [],
  };
}
