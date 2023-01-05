import { Request, Response } from "express";
import { Connect, Query } from "../configs/db.config";

const placeOrder = async (request: Request, response: Response) => {
  let bookNames = request.params;
  let totalPrice = request.params;
  let orderID = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  let query = `INSTER INTO bookOrders (orderID, itemsName, totalPrice) VALUE ('${orderID}', '${bookNames}', '${totalPrice}')`;

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

export default { placeOrder };
