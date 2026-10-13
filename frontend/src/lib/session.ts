import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db";

export const SESSION_COOKIE = "isats_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSessionKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSessionKey());
}

export async function getCurrentClient() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionKey(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sub !== "string") return null;

    return await prisma.user.findFirst({
      where: {
        id: payload.sub,
        role: UserRole.client,
        isActive: true,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        organizationName: true,
      },
    });
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_DURATION_SECONDS,
};
