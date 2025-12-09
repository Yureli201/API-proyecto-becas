import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

function signToken(payload) {
	// payload should contain minimal user data (e.g. id, email)
	return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

function verifyToken(token) {
	return jwt.verify(token, SECRET);
}

// Express middleware para proteger rutas
function authMiddleware(req, res, next) {
	try {
		const authHeader = req.headers.authorization || '';
		const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
		if (!token) return res.status(401).json({ message: 'Token not provided' });

		const decoded = verifyToken(token);
		// attach decoded payload to request
		req.user = decoded;
		return next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
}

export {
	signToken,
	verifyToken,
	authMiddleware,
};
