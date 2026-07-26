import { NextRequest, NextResponse } from "next/server";

export const DEFAULT_ADMIN_SECRET = "onepack-admin-secret";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET_KEY || DEFAULT_ADMIN_SECRET;
}

export function verifyAdminAuth(req: NextRequest): { authorized: boolean; response?: NextResponse } {
  const adminKey = req.headers.get("x-admin-key") || req.headers.get("authorization")?.replace("Bearer ", "");
  const expectedSecret = getAdminSecret();

  if (!adminKey || adminKey !== expectedSecret) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized: Invalid or missing admin passcode." },
        { status: 401 }
      )
    };
  }

  return { authorized: true };
}
