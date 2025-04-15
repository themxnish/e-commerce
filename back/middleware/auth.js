import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token structure' });
        }

        req.user = { id: decoded.id };  // Always available downstream
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: ' + error.message });
    }
};

export default authUser;
