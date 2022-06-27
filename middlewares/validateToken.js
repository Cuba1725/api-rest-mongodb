import jwt from "jsonwebtoken";
import { errorsTokens } from '../helpers/errorsToken.js';

export const validateToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) throw new Error("No existe el token");

        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: errorsTokens(error.message) });
    }
}