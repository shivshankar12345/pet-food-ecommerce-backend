import express from "express";
import {
    createPet,
    getAllPets,
    getPetById,
    softDeletePet,
    updatePetById
}from "../controllers/pet.controller";

const router = express.Router();

router.post("/createPet",createPet);
router.get("/getAllpets",getAllPets);
router.get("getPetById",getPetById);
router.delete("/delete",softDeletePet);
router.put("/updatePet",updatePetById);

export default router;