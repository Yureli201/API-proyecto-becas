import { Router } from "express";
import ticketsControllers from "../controllers/ticketsControllers.js";

const router = Router();

router.post("/insert", ticketsControllers.insertOne);
router.get("/getOne/:ticket_code", ticketsControllers.getOne);
router.get("/getMatricula/:matricula", ticketsControllers.getMatricula);
router.get("/getAll", ticketsControllers.getAll);

export default router;