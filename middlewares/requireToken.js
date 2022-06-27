import jwt from 'jsonwebtoken';

export const requireToken = (req, res, next) => {
    try {
        console.log(req.headers);
        next();        
    } catch (error) {
        console.log(error);
    }
        
}
