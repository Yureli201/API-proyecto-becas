import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_NAME = process.env.MONGODB_NAME || 'becas_db';

let client;
let db;

async function connect() {
	if (db) return db;
	client = new MongoClient(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
	await client.connect();
	db = client.db(MONGODB_NAME);
	return db;
}

async function getUserByEmail(email) {
	const database = await connect();
	const user = await database.collection('users').findOne({ email });
	if (!user) return null;
	// don't return password
	const { password, ...rest } = user;
	return { ...rest };
}

async function getUserByEmailWithPassword(email) {
	const database = await connect();
	return await database.collection('users').findOne({ email });
}

async function createUser(user) {
	const database = await connect();
	const result = await database.collection('users').insertOne(user);
	const created = await database.collection('users').findOne({ _id: result.insertedId });
	const { password, ...rest } = created;
	return { ...rest };
}

export {
	connect,
	getUserByEmail,
	getUserByEmailWithPassword,
	createUser,
};
