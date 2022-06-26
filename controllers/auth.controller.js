import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {    
    const { email, password } = req.body;
    try {
        //alternativa buscando por email
        let user = await User.findOne({ email });
        if(user) throw { code: 11000 }

        user = new User({ email, password });
        await user.save();

        return res.json({ message: "Usuario creado correctamente" });
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

        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET)        

        return res.json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
    }

}
