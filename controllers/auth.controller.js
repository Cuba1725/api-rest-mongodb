import { User } from "../models/User.js";
import { /* generateRefreshToken, */ generateToken } from "../utils/generateToken.js";

export const register = async(req, res) => {    
    try {
        const { email, password } = req.body;
        //alternativa buscando por email
        let user = await User.findOne({ email });
        if(user) throw { code: 11000 }

        user = new User({ email, password });
        await user.save();
        console.log(user);
        const { token, expiresIn } = generateToken(user.id);
        /* generateRefreshToken(user.id, res); */
        
        return res.json({ token, expiresIn });
    } catch (error) {
        //alternativa por defecto de mongoose
        console.log(error);
        if(error.code === 11000) return res.status(400).json({ error: "El email ya existe" });
    }
};

export const login = async(req, res) => {

    try {
        const { email, password } = req.body;	
        let user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) 
            throw new Error("Usuario o contraseña incorrectos");

        const { token, expiresIn } = generateToken(user.id);
        /* generateRefreshToken(user.id, res); */

        
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }

}
