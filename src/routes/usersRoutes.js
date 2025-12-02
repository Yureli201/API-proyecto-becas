import {Router} from "express";
import usersControllers from "../controllers/usersControllers.js";

const router = Router();

router.post("/insert", usersControllers.insertOne);
router.get("/getOne/:email", usersControllers.getOne);
router.get("/getAll", usersControllers.getAll);
router.get("/getRole/:role", usersControllers.getRole);
router.put("/update/:email", usersControllers.update);
router.delete("/delete/:email", usersControllers.delete);

export default router;