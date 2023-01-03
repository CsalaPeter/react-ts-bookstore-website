import { Request, Response } from "express";
import { Connect, Query } from "../configs/db.config";

const getAllBooks = async (request: Request, response: Response) => {
  let query = "SELECT bookID, bookName, author, price, imgUrl FROM books";

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return response.status(200).json(results);
        })
        .catch((error) => {
          console.log(error);
          return response.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          console.log("Closing connection.");
        });
    })
    .catch((error) => {
      console.log(error);
      return response.status(200).json({
        message: error.message,
        error,
      });
    });
};

const getBook = async (request: Request, response: Response) => {
  let bookID = request.params.id;
  let query = `SELECT books.bookID,  bookName, author, publisher, publicationYear, price, imgUrl, pages, description, rating, GROUP_CONCAT(genreName SEPARATOR ', ') as genres 
              FROM books 
              JOIN book_genres ON books.bookID  = book_genres.bookID 
              JOIN genres  ON book_genres.genreID = genres.genreID 
              WHERE  books.bookID = ${bookID}`;
  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return response.status(200).json(results);
        })
        .catch((error) => {
          console.log(error);
          return response.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          console.log("Closing connection.");
        });
    })
    .catch((error) => {
      console.log(error);
      return response.status(200).json({
        message: error.message,
        error,
      });
    });
};

const getTopBooks = async (request: Request, response: Response) => {
  let query =
    "SELECT bookID, bookName, imgUrl FROM books ORDER BY rating DESC LIMIT 5";
  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return response.status(200).json(results);
        })
        .catch((error) => {
          console.log(error);
          return response.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          console.log("Closing connection.");
        });
    })
    .catch((error) => {
      console.log(error);
      return response.status(200).json({
        message: error.message,
        error,
      });
    });
};

export default { getAllBooks, getBook, getTopBooks };
