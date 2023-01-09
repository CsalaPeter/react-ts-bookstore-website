import express, { Express } from "express";
import router from "./routes/bookRoutes";
import orderRouter from "./routes/orderRoutes";

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Serve API requests from the router
app.use("/api", router, orderRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
