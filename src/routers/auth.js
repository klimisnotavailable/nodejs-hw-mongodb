import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema } from '../validation/user-schema.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController, resetPasswordController } from '../controllers/auth.js';
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

authRouter.post("/request-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(resetPasswordController)
);
export default authRouter;
