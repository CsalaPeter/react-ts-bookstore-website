import express from "express";
import controller from "../controllers/book";
const router = express.Router();

router.get("/store", controller.getAllBooks);
router.get("/product/:id", controller.getBook);
router.get("/bestRated", controller.getTopBooks);

export default router;
