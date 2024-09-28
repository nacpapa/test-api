import "dotenv/config";
import { env } from "process";

export const Environment = {
  NODE_ENV: env.NODE_ENV || "development",
  PORT: Number.parseInt(env.PORT ? env.PORT : "3000"),
  DATABASE_URL:
    env.NODE_ENV === "development"
      ? env.DATABASE_URL_DEV
      : env.NODE_ENV === "staging"
        ? env.DATABASE_URL_STAGING
        : env.DATABASE_URL_PROD,
  SERVER_URL:
    env.NODE_ENV === "development"
      ? env.SERVER_URL_LOCAL
      : env.NODE_ENV === "staging"
        ? env.SERVER_URL_STAGING
        : env.SERVER_URL_PROD,
  AUTH0_CLIENT_ID:
    env.NODE_ENV === "production"
      ? env.AUTH0_CLIENT_ID_PROD
      : env.AUTH0_CLIENT_ID_STAGING,
  AUTH0_CLIENT_SECRET:
    env.NODE_ENV === "production"
      ? env.AUTH0_CLIENT_SECRET_PROD
      : env.AUTH0_CLIENT_SECRET_STAGING,
  AUTH0_DOMAIN:
    env.NODE_ENV === "production"
      ? env.AUTH0_DOMAIN_PROD
      : env.AUTH0_DOMAIN_STAGING,

  AUTH_API_AUDIENCE:
    env.NODE_ENV === "production"
      ? env.AUTH0_API_AUDIENCE_PROD
      : env.AUTH0_API_AUDIENCE_STAGING,
  AUTH_API_ISSUER_URL:
    env.NODE_ENV === "production"
      ? env.AUTH0_API_ISSUERBASEURL_PROD
      : env.AUTH0_API_ISSUERBASEURL_STAGING,
};
