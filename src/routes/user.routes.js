import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getUsers);

router.get("/user/:id", getUser);

router.post("/users", createUser);

router.patch("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

export default router;
