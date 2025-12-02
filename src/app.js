import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import ticketsRoutes from "./routes/ticketsRoutes.js"

import './database.js';

const app = express();

// Settings
app.set('port', 3000 );

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use('/api/users', usersRoutes);
app.use('/api/tickets', ticketsRoutes);

export default app;