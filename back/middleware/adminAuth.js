import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token) {
            return res.json({ success: false, message: 'Unauthorized' });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default adminAuth