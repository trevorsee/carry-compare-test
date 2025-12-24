import { cookies } from "next/headers";

const COOKIE_NAME = "carrycoverage_admin_token";

export async function isAdminRequest(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return Boolean(token && process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN);
}

export { COOKIE_NAME };

