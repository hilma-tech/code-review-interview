import type { AuthConfig } from "@hilma/auth-nest";

export const ACCESS_TOKEN_COOKIE = "cri-access-token";

export default (): AuthConfig => {
  const secretOrKey = process.env.JWT_SECRET;

  if (!secretOrKey) throw new TypeError("missing JWT_SECRET");

  return {
    auth: {
      secretOrKey,
      accessTokenCookie: ACCESS_TOKEN_COOKIE,
    },
  };
};
