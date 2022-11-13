import express, { Express, Request, Response } from "express";
const app: Express = express();

app.get("/", (require: Request, response: Response) => {
  response.send("Hello World");
});

app.listen(3000, () => console.log("Listening on port 3000"));
