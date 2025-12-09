import bcrypt from 'bcrypt';
import { getUserByEmail, getUserByEmailWithPassword, createUser } from '../daos/authDaos.js';
import { signToken } from '../jwt.js';

const SALT_ROUNDS = 10;

async function register(req, res) {
	try {
		const { email, password, ...rest } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email y password son requeridos' });

		const existing = await getUserByEmail(email);
		if (existing) return res.status(409).json({ message: 'Usuario ya existe' });

		const hashed = await bcrypt.hash(password, SALT_ROUNDS);
		const userToCreate = { email, password: hashed, ...rest, createdAt: new Date() };
		const created = await createUser(userToCreate);
		return res.status(201).json({ user: created });
	} catch (err) {
		return res.status(500).json({ message: 'Error en registro', error: err.message });
	}
}

async function login(req, res) {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ message: 'Email y password son requeridos' });

		const userWithPass = await getUserByEmailWithPassword(email);
		if (!userWithPass) return res.status(401).json({ message: 'Credenciales inválidas' });

		const match = await bcrypt.compare(password, userWithPass.password || '');
		if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

		// token payload: minimal info
		const payload = { id: userWithPass._id.toString(), email: userWithPass.email };
		const token = signToken(payload);

		// return user without password
		const { password: _p, ...userSafe } = userWithPass;
		return res.json({ user: userSafe, token });
	} catch (err) {
		return res.status(500).json({ message: 'Error en login', error: err.message });
	}
}

// Exportar como ESM
export {
	register,
	login,
};
