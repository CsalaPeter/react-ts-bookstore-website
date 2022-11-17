import express, { Request, response, Response } from "express";
import booksData from "../data/books.json";
const router = express.Router();

router.get("/store", (request: Request, response: Response) => {
  response.status(200).json(booksData);
});

router.get("/product/:id", (request: Request, response: Response) => {
  const book = booksData.find((b) => b.id === parseInt(request.params.id));
  response.status(200).json(book);
});

export default router;
