import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import { Environment } from "../config";

const jwtCheck = auth({
  audience: Environment.AUTH_API_AUDIENCE,
  issuerBaseURL: Environment.AUTH_API_ISSUER_URL,
  tokenSigningAlg: "RS256",
});

export class ExpressAuth0 {
  static async middleware(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    jwtCheck(request, response, (err) => {
      console.log(err);

      if (err) {
        return response
          .status(401)
          .json({ error: "Invalid or missing token!" });
      }

      const user = request.auth as any;
      console.log("user", user);

      if (!user || !user?.payload?.sub) {
        return response.status(401).json({ error: "Invalid token payload!" });
      }

      request.headers.accountId = user.sub;

      next();
    });
  }
}
