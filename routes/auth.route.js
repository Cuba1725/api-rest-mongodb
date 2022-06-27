import { Router } from "express";
import { 
  infoUser, 
  login, 
  register,
  refreshToken, 
  logout,
} from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.post(
  "/register",
  [
    body("email", "formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "La contraseña debe tener al menos 6 caracteres")
      .trim()
      .isLength({ min: 6 }),
    body("password", "Formato de contraseña incorecta").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("Las contraseñas no coinciden");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);

router.post(
  "/login",
  [
    body("email", "formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "La contraseña debe tener al menos 6 caracteres")
      .trim()
      .isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.get("/protected", validateToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);

export default router;
