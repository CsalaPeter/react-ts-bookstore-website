import express from "express";
import orders from "../controllers/orders";
const orderRouter = express.Router();

orderRouter.post("/placeOrder", orders.placeOrder);

export default orderRouter;
