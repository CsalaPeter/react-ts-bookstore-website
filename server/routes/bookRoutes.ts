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

router.get("/bestRated", (request: Request, response: Response) => {
  let bestBooks = [];
  const booksSort = booksData.sort((a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;
    if (ratingA < ratingB) {
      return 1;
    }
    if (ratingA > ratingB) {
      return -1;
    }
    return 0;
  });
  for (let i = 0; i < 5; i++) {
    bestBooks.push(booksSort[i]);
  }
  response.status(200).json(bestBooks);
});

export default router;
