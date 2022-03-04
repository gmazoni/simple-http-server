import express, { Router, Request, Response } from "express";

import mockData from "../assets/mock.json";

const app = express();

const route = Router();

const port = process.env.PORT || 3333;

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "You're in the root endpoint" });
});

route.get("/carousel", (req: Request, res: Response) => {
  res.json(mockData);
});

app.use(route);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
