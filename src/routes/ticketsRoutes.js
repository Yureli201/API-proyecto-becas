import { Router } from "express";
import ticketsControllers from "../controllers/ticketsControllers.js";
import { authMiddleware } from "../jwt.js";

const router = Router();

// Proteger inserción con middleware de autenticación (Bearer token)
router.post("/insert", authMiddleware, ticketsControllers.insertOne);
router.get("/getOne/:ticket_code", ticketsControllers.getOne);
router.get("/getMatricula/:matricula", ticketsControllers.getMatricula);
router.get("/getAll", ticketsControllers.getAll);

export default router;