import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema,resetPasswordSchema } from '../validation/user-schema.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, requestResetEmailController, resetPasswordController, googleOAuthController } from '../controllers/auth.js';
import  validateBody from '../utils/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

authRouter.post("/logout",
  ctrlWrapper(logoutUserController)
);

authRouter.post("/refresh",
  ctrlWrapper(refreshUserSessionController)
);

authRouter.post("/send-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post(
  "/get-oauth-url",
  ctrlWrapper(googleOAuthController)
);

export default authRouter;
