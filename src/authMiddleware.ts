import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from 'aws-jwt-verify';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

let verifier: any = null;

export const authMiddleware = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isLocal = process.env.NODE_ENV === 'development' || !process.env.AWS_LAMBDA_FUNCTION_NAME;

    let claims: any;
    if (isLocal) {
      // *** Local development: Manually verify token *** //
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        console.error('Local: No token provided');
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
      }

      if (!verifier) {
        verifier = CognitoJwtVerifier.create({
          userPoolId: process.env.COGNITO_USER_POOL_ID!,
          tokenUse: 'id',
          clientId: process.env.COGNITO_APP_CLIENT_ID!,
        });
      }

      try {
        claims = await verifier.verify(token);
        console.log('Local: Token verified, claims:', claims);
      } catch (err) {
        console.error('Local: Token verification failed:', err);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
      }
    } else {
      // *** Production: Use API Gateway JWT authorizer claims *** //
      // *** Issuer URL: https://cognito-idp.{region}.amazonaws.com/{user-pool-id}
      // *** Audience: App Client ID
      // *** Identity source: $request.header.Authorization
      claims = (req as any).apiGateway?.event?.requestContext?.authorizer?.jwt?.claims;
      if (!claims) {
        console.error('Production: No JWT claims found from API Gateway');
        res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
        return;
      }
    }

    try {
      const userId = claims.sub;  // Cognito user ID
      const userRole = claims['custom:role'] || '';
      if (!userId || !userRole) {
        console.error('Invalid token claims:', { userId, userRole });
        res.status(400).json({ message: 'Invalid token claims' });
        return;
      }

      req.user = { id: userId, role: userRole };

      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) {
        console.error('Access denied for user role:', userRole);
        res.status(403).json({ message: "Access Denied" });
        return;
      }

      next();
    } catch (err) {
      console.error('Error processing JWT claims:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
