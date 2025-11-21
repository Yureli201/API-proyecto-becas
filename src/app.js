import express from "express";
import morgan from "morgan";
import cors from "cors";

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


export default app;