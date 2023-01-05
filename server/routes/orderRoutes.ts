import express from "express";
import orders from "../controllers/orders";
const router = express.Router();

router.get("/placeOrder", orders.placeOrder);
