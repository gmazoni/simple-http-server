import express, { Router, Request, Response } from "express";
import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";
import path from "path";
import glob from "glob";

const app = express();

const route = Router();

const port = process.env.PORT || 3333;

app.use(express.json());

app.use(express.static("public"));

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "You're in the root endpoint" });
});

route.get("/carousel", (req: Request, res: Response) => {
  const images: string[] = glob
    .sync(path.join(__dirname, "..", "public", "images", "*.jpg"))
    .map((file: string) => path.basename(file));

  let response: [Object?] = [];
  while (images.length > 0) {
    response.push({
      title: uniqueNamesGenerator({
        dictionaries: [colors, animals],
      }),
      images: images.splice(0, Math.random() * 4 + 1),
    });
  }

  res.json(response);
});

app.use(route);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
