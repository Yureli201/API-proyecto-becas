import express from 'express';
const router = express.Router();

import { register, login } from '../controllers/authControllers.js';
import { authMiddleware } from '../jwt.js';

router.post('/register', register);

router.post('/login', login);

router.get('/profile', authMiddleware, (req, res) => {
	res.json({ user: req.user });
});

export default router;